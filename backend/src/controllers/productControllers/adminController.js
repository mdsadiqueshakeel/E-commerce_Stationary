const { uploadToS3, s3 } = require("../../config/s3_config");
const { PrismaClient } = require("@prisma/client");
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { DeleteObjectsCommand } = require('@aws-sdk/client-s3');

const prisma = new PrismaClient();

// Admin-only: list all products (any status)
async function getAdminProducts(req, res) {
  try {
    const items = await prisma.product.findMany({
        orderBy: {
        createdAt: "desc",
      },
      include: {
        images: true,  // Include images in the response
      },
    });

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Always construct S3 URLs for images
    const productsWithImages = items.map(product => ({
      ...product,
      images: product.images.map(img => ({
        ...img,
        url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${img.url}`
      }))
    }));

    res.json(productsWithImages);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}






// Admin-only: create a new product
async function createProduct(req, res) {
  const {
    title,
    slug,
    description,
    shortDesc,
    price,
    discountedPrice,
    productCode,
    stockQuantity,
    categoryId,
    brand,
    tags,
    status,
    isActive,
    weight,
    dimensions,
    publishedAt,
    featuredAt,
    metaTitle,
    metaDescription,
    images: imagesUrls,  // Optional external image URLs
  } = req.body;

  
  if (!title || !description || !price) {
    console.log(title, description, price);
    return res.status(400).json({ error: "Missing required fields" });
  }

  let images = [];
  
  // If images are uploaded via multer, use them
  if(req.files && req.files.length > 0) {
    try {
      for (const file of req.files) {
        const key = `products/${Date.now()}_${file.originalname}`;
        const result = await uploadToS3(file, key);

        const location = result.Location  || `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;

        images.push(location);
    }
    console.log("Uploaded images:", images);
    } catch (error) {
      console.error("Error uploading images to S3:", error);
      return res.status(500).json({ error: "Error uploading images" });
    }
  }


  // If external image URLs provided in JSON body, use them
  if (imagesUrls && Array.isArray(imagesUrls) && imagesUrls.length > 0) {
    const urls = imagesUrls.map(img =>  img.image ).filter(Boolean); // Filter out any empty strings
    
    images = images.concat(urls); // Combine with uploaded images if any
  }
  if (images.length === 0) {
    console.log(images.length);
    return res.status(400).json({ error: "No images uploaded or provided" });
  }



  try {
    const newproduct = await prisma.product.create({
        data: {
            title,
            slug,
            description,
            shortDesc,
            price: Number(price),
            discountedPrice: discountedPrice ? Number(discountedPrice) : null,
            productCode: productCode || null,
            stockQuantity: stockQuantity ? Number(stockQuantity) : 0,
            categoryId,
            brand,
            tags,
            images: {
                create: images.map(url => ({ url }))   // loop to create multiple image records
            },
            status: status || 'DRAFT',
            isActive: isActive === "true" || isActive === true, // convert string to boolean
            weight: weight ? Number(weight) : null,
            dimensions,
            createdBy: req.user.id,
            publishedAt: publishedAt ? new Date(publishedAt) : null,
            featuredAt: featuredAt ? new Date(featuredAt) : null,
            metaTitle,
            metaDescription,
        },
        include: {images: true},
        
    });
    res.status(201).json({
        message: "Product created successfully",
        product: newproduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" }); 
  }

}








// Update product (Admin)
async function updateProduct(req, res) {
    const { id } = req.params;
    // Create a clean copy of the data without imagesUrls
    const { imagesUrls, ...cleanData } = { ...req.body };
    
    console.log("Update request body:", req.body);
    console.log("Clean data for Prisma:", cleanData);

    try {
        // Convert numeric fields to numbers
        if (cleanData.price) cleanData.price = Number(cleanData.price);
        if (cleanData.discountedPrice) cleanData.discountedPrice = Number(cleanData.discountedPrice);
        if (cleanData.stockQuantity) cleanData.stockQuantity = Number(cleanData.stockQuantity);
        if (cleanData.weight) cleanData.weight = Number(cleanData.weight);

        // Handle images upload (from multer)
        let images = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const key = `products/${Date.now()}_${file.originalname}`;
                const result = await uploadToS3(file, key);

                const location = result.Location || `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;

                images.push(location);
            }
        }

        // Handle additional URLs (from req.body.imagesUrls)
        if (imagesUrls) {
            let parsedUrls;
            
            // Handle different formats of imagesUrls
            if (typeof imagesUrls === 'string') {
                try {
                    parsedUrls = JSON.parse(imagesUrls);
                } catch (e) {
                    parsedUrls = [imagesUrls];
                }
            } else if (Array.isArray(imagesUrls)) {
                parsedUrls = imagesUrls;
            }
            
            if (parsedUrls && Array.isArray(parsedUrls)) {
                // Extract URLs properly based on format
                const urls = parsedUrls.map(img => {
                    if (typeof img === 'object' && img.image) return img.image;
                    return img;
                }).filter(Boolean);
                
                images = images.concat(urls);
            }
        }

        // If new images uploaded -> delete old images (DB + S3) and add new ones
        if (images.length > 0) {
            // Find old images in DB
            const oldImages = await prisma.productImage.findMany({
                where: { productId: id },
            });

            // Delete old images from S3
            for (const img of oldImages) {
                try {
                    const url = new URL(img.url);
                    // extract key after bucket host
                    const key = url.pathname.substring(1); // Remove leading slash
                    await s3.send(new DeleteObjectCommand({
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: key,
                    }));
                    console.log(`Deleted old image from S3: ${key}`)
                } catch (error) {
                    console.error(`Error deleting old image from S3: ${error.message}`);
                    console.error(`Could not delete image: ${img.url}`);
                }
            }

            // Remove old images from DB
            await prisma.productImage.deleteMany({
                where: { productId: id },
            });

            // Add new images to DB
            cleanData.images = {
                create: images.map(url => ({ url }))   // loop to create multiple image records
            };
        }

        // Validate description length
        if(cleanData.description && cleanData.description.length > 500) {
            return res.status(400).json({ error: "Description is too long" });
        }

        console.log("Final data for Prisma update:", cleanData);

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: cleanData,
            include: { images: true },
        });

        res.json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: "Product not found" });
        }
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}





// Change product status (Admin)
async function changeStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }
  
  if(!['DRAFT', 'NORMAL', 'FEATURE'].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

 try{
  const updatedStatus = await prisma.product.update({
    where: { id },
    data: { 
      status,
      publishedAt: ( status === 'NORMAL' || status === 'FEATURE') ? new Date() : null,  // Set publishedAt if status is NORMAL or FEATURE
      featuredAt: status === 'FEATURE' ? new Date() : null // Set featuredAt
     },
  });
  res.json({
    message: "Product status updated successfully",
    product: updatedStatus,
  });
 } catch (error) {
  if (error.code === 'P2025') {
    return res.status(404).json({ error: "Product not found" });
  }
  console.error("Error changing product status:", error);
  res.status(500).json({ error: "Internal server error" });
 }
}








// Delete Product (Admin)
// Delete product + images (DB + S3)
async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    // Find product with images
    const product = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // ---- Delete images from S3 ----
    if (product.images.length > 0) {
      // Collect keys
      const keys = product.images.map((img) => {
        // Extract key from URL
        return {
          Key: img.url.includes(".amazonaws.com/")
            ? img.url.split(".amazonaws.com/")[1]
            : img.url,
        };
      });

      // Send batch delete
      await s3.send(
        new DeleteObjectsCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Delete: { Objects: keys },
        })
      );

      console.log("✅ Deleted images from S3:", keys);
    }

    // ---- Delete images from DB ----
    await prisma.productImage.deleteMany({
      where: { productId: id },
    });

    // ---- Delete product from DB ----
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return res.json({
      message: "Product and images deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Product not found" });
    }
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

    







module.exports = { getAdminProducts, createProduct, updateProduct, changeStatus, deleteProduct };
