const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


async function createOrders (req, res) {
    const { items, addressId, fulfillment = "SHIPPING", paymentMethod } = req.body;
    const userId = req.user.id;

    if(!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Order must have at least 1 item' });
    }

    try {
        // Fulfillment rules
        if (fulfillment === "SHIPPING" && !addressId) {
            return res.status(400).json({ error: "Shipping addreses is required" });
        }
        if (fulfillment === "PICKUP" && addressId) {
            return res.status(400).json({ error: "Pickup ordres should have a shipping address" });
        }



        // Fetch products
        const productIds = items.map(i => i.productId);
        const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
        
        // Validate all productIds exist
        const found = new Set(products.map(p => p.id));
        const missing = productIds.filter(id => !found.has(id));
        if (missing.length) {
            return res.status(400).json({ error: `Invalid productId(s): ${missing.join(",")}` });
        }

        // Build snapshot + calculate total
        let totalAmount = 0;
        const orderItems = items.map(i => {
            const product = products.find(p => p.id === i.productId);
            const unit = Number(product.discountedPrice ?? product.price);
            const qty = Number(i.quantity);
            totalAmount += unit * qty;
            return { productId: product.id, quantity: qty, price: unit};
        });


        // Create order inside transaction (with stock decrement)
        const order = await prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
            data: {
                userId,
                addressId: fulfillment === "SHIPPING" ? addressId: null,
                fullfillment,
                paymentMethod,
                totalAmount,
                status: "PENDING",
                item: { create: orderItems }
            },
            include: { items: true, address: true }
        });


        // Stock decrement
        for (const i of items) {
            await tx.product.update({
                where: { id: i.productId },
                data: { stockQuantity: { decrement: i.quantity} },
            });
        }

        return newOrder;
    });

     return res.status(201).json(`Product Successfully Ordered: ${order}`);
    } catch (error) {
        console.error("Error fetching during order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};






module.exports = { createOrders }