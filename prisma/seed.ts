import prisma from '@/app/ีutils/db';
import bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('admin12345', 10);

  await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Admin user created');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
