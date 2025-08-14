const { PrismaClient } = require('@prisma/client');
const cron = require('node-cron');




// Runs every night at midnight
// Clean Expired Tokens in Midnnight
const cleanupToken = cron.schedule('0 0 * * *', async () => {
    try {
        const result = await prisma.resetPasswordToken.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date()  // delete tokens older than now
                }
            }
        });
        console.log(`✅ Deleted ${result.count} expired tokens at midnight.`);
    } catch (error) {
        console.error("Error cleaning expired tokens:", error);
    }
});