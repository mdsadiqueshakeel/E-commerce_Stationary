const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



// Allowed status transitions
const allowedTransitions = {
    PENDING: ["PROCESSING", "CANCELLED"],
    PROCESSING: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED"],
    DELIVERED: [],
    CANCELLED: []
};


// List of Orders with pagination & status filter
async function getAllOrders (req, res) {
    const { page = 1, limit = 20, status, fulfillment } = req.query;

    try {
        const where = {};
        if(status) where.status = status;
        if(fulfillment) where.fulfillment = fulfillment;

        const orders = await prisma.order.findMany({
            where,
            include: {
                user: { select: { id: true, name: true, email: true } },
                items: { include: { product: true } },
                address: {
                    select: {
                        phone: true,
                        street: true,
                        line1: true,
                        city: true,
                        state: true,
                        postalCode: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * limit,
            take: Number(limit)
        });

        const total = await prisma.order.count({ where });

        res.json({ page: Number(page), limit: Number(limit), total, orders });
    } catch (error) {
        console.error("Error during Admin get all orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}




// Get single order with items + product + address
async function getOrderById (req, res) {
    const { id } = req.params;

    try {
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, name: true, email: true } },
                items: { include: { product: true } },
                address: {
                    select: {
                        phone: true,
                        street: true,
                        line1: true,
                        city: true,
                        state: true,
                        postalCode: true
                    }
                }
            }
        });

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        console.error("Error during Admin get order by Id:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



// Update order status with allowed transitions
async function updateOrders (req, res) {
    const { id } = req.params;
    const { status: newStatus, fulfillment } = req.body;

    try {
        const order = await prisma.order.findUnique({ where: { id }, include: { address: true} });
        
        if(!order) {
            return res.status(404).json({ error: "Order not found" });
        }


        // Handle Status Update
        if (newStatus) {
            if(order.status === newStatus) {
                return res.status(400).json({ error: "Order already in this status" });
            }
        }

        // Validate allowed transition
        if(!allowedTransitions[order.status].includes(newStatus)) {
            return res.status(400).json({
                error: `Cannot change status from ${order.status} to ${newStatus}`
            });
        }


        // Handle Fulfillment Update
        if(fulfillment) {
            if(!["SHIPPING", "PICKUP"].includes(fulfillment)) {
                return res.status(400).json({ error: "Invalid fulfillment type" });
            }

            if(["SHIPPED, DELIVERED"].includes(order.status)) {
                return res.status(400).json({ error: "Cannot change fulfillment after shipping" });
            }

            // Require address for SHIPPING
            if(fulfillment === "SHIPPING" && !order.addressId) {
                return res.status(400).json({ error: "Shipping requires an address" });
            }
        }

        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { 
                status: newStatus|| order.status ,
                fulfillment: fulfillment || order.fulfillment,
                addressId: fulfillment === "PICKUP" ? null : order.addressId
            },
            include: {
                user: { select: { id: true, name: true, email: true } },
                address: {
                    select: {
                        phone: true,
                        street: true,
                        line1: true,
                        city: true,
                        state: true,
                        postalCode: true
                    }
                }
            }
        });

        res.json(updatedOrder);
    } catch (error) {
        console.error("Error during Admin update order status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}







// Usually use CANCELLED status instead of deleting
async function deleteOrders (req, res) {
    try {
        await prisma.order.delete({ where: { id: req.params.id } });
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error during Admin delete order:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}








module.exports = { getAllOrders, getOrderById, updateOrders, deleteOrders }