const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
