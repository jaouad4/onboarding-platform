import 'dotenv/config';
import bcryptjs from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  const existingAdmin = await prisma.user.findUnique({
    where: { username: 'admin' },
  });

  if (existingAdmin) {
    console.log('Admin account already exists, skipping seed.');
    return;
  }

  const hashedPassword = await bcryptjs.hash('Admin@smodu2025', 12);

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'SMODU',
      role: 'ADMIN',
      status: 'READY',
      isActive: true,
    },
  });

  console.log(`Admin account created: ${admin.username}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
