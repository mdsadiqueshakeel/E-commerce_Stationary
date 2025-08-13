const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



// Public: list published products (Normal and Feature)
async function getUserProducts(req, res) {
    try {
        const items = await prisma.product.findMany({
            where: { status: { in: ['NORMAL', 'FEATURE'] } },
            orderBy: { createdAt: 'desc' }
        });
        if (!items || items.length === 0) {
            return res.status(404).json({ error: "No products found" });
        }

        res.json({ items });
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
