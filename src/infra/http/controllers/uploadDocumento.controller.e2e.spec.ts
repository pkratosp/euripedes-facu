import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma.service';

describe('Anexar perguntas e2e', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let prisma: PrismaService;
  let factoryCadastrarAdmin: FactoryCadastrarAdmin;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [FactoryCadastrarAdmin],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    factoryCadastrarAdmin = moduleRef.get(FactoryCadastrarAdmin);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  it('[POST] /upload/documento', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario.id });

    const result = await request(app.getHttpServer())
      .post('/upload/documento')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', './tests/e2e/upload-test-e2e.jpeg');

    const anexos = await prisma.documentos.findMany();

    expect(result.statusCode).toBe(201);
    expect(anexos.length).toBe(1);
  }, 15000);
});
