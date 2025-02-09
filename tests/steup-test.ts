import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

config({ path: '.env', override: true });
config({ path: '.env.test', override: true });

const env = process.env;

const prisma = new PrismaClient({});

function generateUniqueDatabase(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Variavel de ambiente não definida');
  }

  const urlDatabase = new URL(env.DATABASE_URL);

  urlDatabase.searchParams.set('schema', schemaId);

  return urlDatabase.toString();
}

const schemaId = randomUUID();

beforeAll(() => {
  const databaseUrl = generateUniqueDatabase(schemaId);

  env.DATABASE_URL = databaseUrl;

  execSync('npx prisma migrate deploy');
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
