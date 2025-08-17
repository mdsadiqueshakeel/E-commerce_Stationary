const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



// Public: list published products (Normal and Feature) and also support pagination and refresh mode
async function getUserProducts(req, res) {
    try {
        let  { mode, lastCreatedAt, limit } = req.query;
        limit = parseInt(limit) || 12;       // Default to 12 if not provided

        const baseWhere = { status: { in: ['NORMAL', 'FEATURE'] } };

        let items = [];

        // Default mode: return all products
        if (!mode) {
            items = await prisma.product.findMany({
                where: baseWhere,
                orderBy: { createdAt: 'desc' },
                take: limit,
                include: {
                    images: true,
                }
            });

        
            if (!items || items.length === 0) {
                return res.status(404).json({ error: "No products found" });
            }

            return res.json({
                mode: 'default',
                items: formatProductWithS3(items),
                count: items.length
            });
        }


        // Scroll mode: get older products based on lastCreatedAt
        if (mode === 'scroll' && lastCreatedAt) {
            items = await prisma.product.findMany({
                where: {
                    ...baseWhere,
                    createdAt: { lt: new Date(lastCreatedAt) }   // older than lastCreatedAt
                },
                orderBy: { createdAt: 'desc' },
                take: limit,
                include: {
                    images: true,
                },
            });

            if (!items || items.length === 0) {
                return res.status(404).json({ error: "No more products found" });
            }

            return res.json({
                mode: 'scroll',
                items: formatProductWithS3(items),
                count: items.length
            });
        }


        // Refresh mode: get newer products than lastCreatedAt
        if (mode === 'refresh' && lastCreatedAt) {
            items = await prisma.product.findMany({
                where: {
                    ...baseWhere,
                    createdAt: { gt: new Date(lastCreatedAt) }   // newer than lastCreatedAt
                },
                orderBy: { createdAt: 'desc' },
                include: {
                    images: true,
                },
            });


            // If no new items, return latest 12 products
            if (items.length === 0) {
                items = await prisma.product.findMany({
                    where: baseWhere,
                    orderBy: { createdAt: 'desc' },
                    take: limit,
                    include: {
                        images: true,
                    },
                });
            }

            if (!items || items.length === 0) {
                return res.status(404).json({ error: "No new products found" });
            }

            return res.json({
                mode: 'refresh',
                items: formatProductWithS3(items),
                count: items.length
            });
        }

        // Invalid request
        return res.status(400).json({ error: "Invalid request parameters" });

} catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



// Helper function to construct S3 URL for images
function formatProductWithS3(products) {
    return products.map((product) => ({
        ...product,
        images: product.images.map((img) => ({
            ...img,
            url: img.url.startsWith("http") ? img.url : `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${img.url}`
        })),
    }));
}






// Public: get single product (only if published)
async function getUserProductsById(req, res) {
    const { id } = req.params;

    try {
        const item = await prisma.product.findUnique({
            where: { id },
            include: {
                images: true,
            }
        });

            if(!item) {
                return res.status(404).json({ error: "Product not found" });
            }

            if(item.status === 'DRAFT') {
                const auth = req.headers.authorization;
                if(!auth || !auth.startsWith('Bearer')) {
                    return res.status(403).json({ error: "Forbidden: Product is not found" });
                }
            }

            
                const itemWithImages = {
                    ...item,
                    images: item.images.map(img => ({
                        ...img,
                        url: img.url.startsWith("http") ? img.url : `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${img.url}`
                    }))
                };
            

        res.json({ itemWithImages });
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
    







module.exports = { getUserProducts, getUserProductsById };
