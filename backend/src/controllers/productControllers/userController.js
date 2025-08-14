const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



// Public: list published products (Normal and Feature) and also support pagination and refresh mode
async function getUserProducts(req, res) {
    try {
        let  { mode, lastCreatedAt, limit } = req.query;
        limit = parseInt(limit) || 12;       // Default to 12 if not provided

        let items = [];

        if (!mode) {
            // Default mode: return all products
            items = await prisma.product.findMany({
                where: { status: { in: ['NORMAL', 'FEATURE'] } },
                orderBy: { createdAt: 'desc' },
                take: limit
            });

        
            if (!items || items.length === 0) {
                return res.status(404).json({ error: "No products found" });
            }

            return res.json({
                mode: 'default',
                items,
                count: items.length
            });
        }


        // Scroll mode: get older products based on lastCreatedAt
        if (mode === 'scroll' && lastCreatedAt) {
            items = await prisma.product.findMany({
                where: {
                    status: { in: ['NORMAL', 'FEATURE'] },
                    createdAt: { lt: new Date(lastCreatedAt) }   // older than lastCreatedAt
                },
                orderBy: { createdAt: 'desc' },
                take: limit
            });

            if (!items || items.length === 0) {
                return res.status(404).json({ error: "No more products found" });
            }

            return res.json({
                mode: 'scroll',
                items,
                count: items.length
            });
        }


        // Refresh mode: get newer products than lastCreatedAt
        if (mode === 'refresh' && lastCreatedAt) {
            items = await prisma.product.findMany({
                where: {
                    status: { in: ['NORMAL', 'FEATURE'] },
                    createdAt: { gt: new Date(lastCreatedAt) }   // newer than lastCreatedAt
                },
                orderBy: { createdAt: 'desc' },
            });


            // If no new items, return latest 12 products
            if (items.length === 0) {
                items = await prisma.product.findMany({
                    where: { status: { in: ['NORMAL', 'FEATURE'] } },
                    orderBy: { createdAt: 'desc' },
                    take: limit
                });
            }

            if (!items || items.length === 0) {
                return res.status(404).json({ error: "No new products found" });
            }

            return res.json({
                mode: 'refresh',
                items,
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






// Public: get single product (only if published)
async function getUserProductsById(req, res) {
    const { id } = req.params;

    try {
        const item = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                user: true
            }
        });

            if(!item) {
                return res.status(404).json({ error: "Product not found" });
            }

            if(item.status === 'DRAFT') {
                const auth = req.headers.authorization;
                if(!auth || !auth.startsWith('Bearer ')) {
                    return res.status(403).json({ error: "Forbidden: Product is not found" });
                }
            }

        res.json({ item });
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
    







module.exports = { getUserProducts, getUserProductsById };
