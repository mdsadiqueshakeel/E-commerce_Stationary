const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



// list all addresses for the logged-in user (for address page)
async function getAddresses(req, res) {
    const userId = req.user.id;   // Get the user ID from the authenticated request
    
    try {
        const addresses = await prisma.address.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        if (!addresses || addresses.length === 0) {
            return res.status(404).json({ error: 'No addresses found' });
        }

        res.json({ addresses });
    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



// Create a new address with a hard limit of 4 addresses per user
async function addAddresses(req, res) {
    const userId = req.user.id;


    try {
        // Check if the user already has 4 addresses
        const existingAddresses = await prisma.address.count({
            where: { userId },
        });

        if (existingAddresses >= 4) {
            return res.status(400).json({ error: 'You can only save 4 addresses. Please delete one before to add a new one.' });
    }

    // Force first address to default, otherwise set isDefault to false
    const isDefault = existingAddresses === 0 ? true : !!req.body.isDefault;
    const { label, fullName, phone, street, line1, line2, city, state, postalCode, country } = req.body;

    let created;
    if (isDefault) {
        // If this should be the default address, unset any existing default address (safety) then create the new address
        const [_, addr] = await prisma.$transaction([
            prisma.address.updateMany({
                where: { userId, isDefault: true },
                data: { isDefault: false },
            }),
            prisma.address.create({
                data: {
                    label,
                    fullName,
                    phone,
                    street,
                    line1,
                    line2,
                    city,
                    state,
                    postalCode,
                    country: 'India', // Assuming country is always India
                    user: { connect: { id: userId } },
                    isDefault: true, // Set this address as default
                },
            }),
        ]);

        created = addr;
    } else {
        // Create a new address without setting it as default
        created = await prisma.address.create({
            data: {
                label,
                fullName,
                phone,
                street,
                line1,
                line2,
                city,
                state,
                postalCode,
                country: 'India',    // Assuming country is always India
                isDefault: false,    // Set to false if not the first address
                user: { connect: { id: userId } },
            },
        });
    }

    res.json({ message: 'Address added successfully', created });
    } catch (error) {
        console.error("Error adding address:", error); 
        res.status(500).json({ error: 'Internal server error' });
    }
}








module.exports = { getAddresses, addAddresses };