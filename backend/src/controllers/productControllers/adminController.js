const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Admin-only: list all products (any status)
async function getAdminProducts(req, res) {
  try {
    const items = await prisma.product.findMany({
        orderBy: {
        createdAt: "desc",
      },
    });

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(items);
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
  } = req.body;

  
  if (!title || !description || !price) {
    console.log(title, description, price);
    return res.status(400).json({ error: "Missing required fields" });
  }

  let images = [];
  if(req.files && req.files.length > 0) {
    // If images are uploaded via multer, use them
    images = req.files.map(file => file.location); // Assuming file.location contains the S3
    console.log("Uploaded images:", images);
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
            productCode,
            stockQuantity: stockQuantity ? Number(stockQuantity) : 0,
            categoryId,
            brand,
            tags,
            images: {
                create: images.map(image => ({ url: image }))   // loop to create multiple image records
            },
            status: status || 'DRAFT',
            isActive: isActive !== undefined ? isActive : true,
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
    const data = { ...req.body };

    if (!data.title || !data.description || !data.price || !data.images) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Convert numeric fields to numbers
        if (data.price) data.price = Number(data.price);
        if (data.discountedPrice) data.discountedPrice = Number(data.discountedPrice);
        if (data.stockQuantity) data.stockQuantity = Number(data.stockQuantity);
        if (data.weight) data.weight = Number(data.weight);

        // Handle images as an array of objects
        if (data.images && Array.isArray(data.images)) {
            data.images = data.images.map(image => ({ url: image }));
        }

        // Validate description length
        if(data.description && data.description.length > 500) {
            return res.status(400).json({ error: "Description is too long" });
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data,
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


// Delete product (Admin)
async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const deleteProduct = await prisma.product.delete({
      where: { id },
    });
    res.json({
      message: "Product deleted successfully",
      product: deleteProduct,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Product not found" });
    }
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


    







module.exports = { getAdminProducts, createProduct, updateProduct, changeStatus, deleteProduct };
