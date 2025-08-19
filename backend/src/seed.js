// This script is designed to be run with Prisma to seed your database.
// Place it in your `prisma` directory (or wherever your schema is).
// To run it, use the command: `npx prisma db seed`
// Make sure you have a `seed` script defined in your package.json:
// "prisma": {
//   "seed": "node prisma/seed.js"
// }

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// A user ID to associate with the created products.
// Replace this with a real user ID from your database if needed.
const CREATED_BY_USER_ID = '5f1a4892-dbf8-4952-abac-00f49efc0085';

const stationeryProducts = [
  { title: 'Classic Ruled Notebook', description: 'A5 size, 200 ruled pages, perfect for daily notes.', price: 12.99, stockQuantity: 150, brand: 'PaperLuxe', tags: 'notebook, ruled, office', status: 'NORMAL' },
  { title: 'Gel Pen Set (12 Colors)', description: 'Smooth-writing gel pens in a variety of vibrant colors.', price: 15.50, stockQuantity: 200, brand: 'Inscribe', tags: 'pens, gel, colorful', status: 'NORMAL' },
  { title: 'Mechanical Pencil Duo', description: '0.7mm lead mechanical pencils with comfortable grip.', price: 7.99, stockQuantity: 300, brand: 'Graphite Co.', tags: 'pencil, mechanical', status: 'NORMAL' },
  { title: 'Sticky Note Cube', description: '400 sheets of colorful sticky notes in a convenient cube.', price: 8.99, stockQuantity: 450, brand: 'PostUp', tags: 'notes, sticky', status: 'DRAFT' },
  { title: 'Stainless Steel Ruler', description: 'Durable 12-inch stainless steel ruler with metric and imperial units.', price: 5.49, stockQuantity: 120, brand: 'MeasureIt', tags: 'ruler, steel', status: 'NORMAL' },
  { title: 'Whiteboard Marker Pack', description: 'Pack of 4 dry-erase markers (Black, Blue, Red, Green).', price: 6.99, stockQuantity: 180, brand: 'WipeClean', tags: 'markers, whiteboard', status: 'FEATURE' },
  { title: 'Premium Fountain Pen', description: 'Elegant fountain pen with a medium nib for a smooth writing experience.', price: 45.00, stockQuantity: 50, brand: 'Scribe & Co.', tags: 'pen, fountain, luxury', status: 'NORMAL' },
  { title: 'Manila File Folders (50 Pack)', description: 'Letter-sized manila folders for organizing documents.', price: 18.99, stockQuantity: 100, brand: 'FileRight', tags: 'folders, office', status: 'NORMAL' },
  { title: 'Electric Pencil Sharpener', description: 'Fast and reliable electric sharpener for standard pencils.', price: 22.50, stockQuantity: 75, brand: 'PointPerfect', tags: 'sharpener, electric', status: 'DRAFT' },
  { title: 'Leather Bound Journal', description: 'A luxurious leather journal with 240 unruled pages.', price: 35.99, stockQuantity: 60, brand: 'PaperLuxe', tags: 'journal, leather, premium', status: 'NORMAL' },
  { title: 'Highlighter Variety Pack', description: 'Set of 6 fluorescent highlighters in chisel tip.', price: 9.99, stockQuantity: 250, brand: 'GlowWrite', tags: 'highlighters, colorful', status: 'NORMAL' },
  { title: 'Desk Organizer Caddy', description: 'Mesh metal desk organizer with multiple compartments.', price: 19.99, stockQuantity: 90, brand: 'OrganizeIt', tags: 'organizer, desk', status: 'NORMAL' },
  { title: 'Correction Tape Roller', description: 'Easy-to-use correction tape for clean error fixing.', price: 4.99, stockQuantity: 500, brand: 'FixIt', tags: 'correction, tape', status: 'FEATURE' },
  { title: 'Binder Clips (Assorted Sizes)', description: 'Box of 100 binder clips in small, medium, and large sizes.', price: 11.99, stockQuantity: 320, brand: 'ClipCo', tags: 'clips, binder, office', status: 'NORMAL' },
  { title: 'Watercolor Paint Set', description: 'Beginner watercolor set with 24 colors and a brush.', price: 25.99, stockQuantity: 80, brand: 'Artisan Hue', tags: 'art, paint, watercolor', status: 'DRAFT' },
  { title: 'Heavy Duty Stapler', description: 'Staples up to 100 sheets of paper with ease.', price: 29.99, stockQuantity: 65, brand: 'StaplePro', tags: 'stapler, office, heavy-duty', status: 'NORMAL' },
  { title: 'Bubble Mailers (25 Pack)', description: 'Padded envelopes for safely shipping small items.', price: 14.50, stockQuantity: 110, brand: 'ShipSafe', tags: 'shipping, mailers', status: 'NORMAL' },
  { title: 'Scissors (8-Inch)', description: 'Sharp, all-purpose scissors with a comfortable soft grip.', price: 7.25, stockQuantity: 220, brand: 'CutWell', tags: 'scissors, office', status: 'NORMAL' },
  { title: 'Laminating Machine', description: 'Personal laminator for documents up to 9 inches wide.', price: 39.99, stockQuantity: 40, brand: 'SealIt', tags: 'laminator, office', status: 'DRAFT' },
  { title: 'Sketchbook (Hardcover)', description: '9x12 inch sketchbook with 100 sheets of high-quality drawing paper.', price: 18.99, stockQuantity: 95, brand: 'Artisan Hue', tags: 'art, sketchbook, drawing', status: 'NORMAL' },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const p of stationeryProducts) {
    const product = await prisma.product.create({
      data: {
        title: p.title,
        description: p.description,
        shortDesc: `A high-quality ${p.brand} product.`,
        price: p.price,
        discountedPrice: p.price > 20 ? parseFloat((p.price * 0.85).toFixed(2)) : null, // 15% discount on items over $20
        productCode: `${p.brand.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        stockQuantity: p.stockQuantity,
        brand: p.brand,
        tags: p.tags,
        status: p.status,
        isActive: true,
        weight: Math.random() * 2, // Random weight up to 2kg
        createdBy: CREATED_BY_USER_ID,
        // The 'images' field is a relation, so we don't add it here directly.
        // You would typically create images separately and link them.
        // For seeding, we'll leave it empty.
      },
    });
    console.log(`Created product with id: ${product.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
