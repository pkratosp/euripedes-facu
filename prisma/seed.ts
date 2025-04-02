import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

// TODO: ajustar o seed
async function seed() {
  console.warn('Inserindo usuario default');
  await prisma.user.deleteMany();
  const passwordUser = await hash('12345678', 6);
  await prisma.user.create({
    data: {
      nome: 'jhon doe',
      password: passwordUser,
      username: 'jhondoe',
    },
  });
}

seed().catch((error) => console.error(error));
