const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cron = require('node-cron');

async function seed() {
  const hash = await bcrypt.hash('Admin@123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@ac.in' },
    update: {},
    create: {
      email: 'admin@ac.in',
      name: 'Admin',
      passwordHash: hash,
      role: 'ADMIN'
    }
  });
  console.log('seeded admin');
}
seed().finally(() => prisma.$disconnect());




// Runs every night at midnight
cron.schedule('0 0 * * *', async () => {
    await prisma.resetPasswordToken.deleteMany({
        where: {
            expiresAt: {
                lt: new Date()  // Delete expired tokens
            }
        }
    });

    console.log('Expired reset password cleaned up');
});