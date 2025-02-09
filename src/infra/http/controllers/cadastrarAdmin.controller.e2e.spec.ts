import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma.service';

describe('Cadastrar usuario admin e2e', () => {
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

  it('[POST] /admin', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario.id });

    const result = await request(app.getHttpServer())
      .post(`/admin`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'jhon doe',
        username: 'jhondoe',
        password: '123456',
      });

    const usuarios = await prisma.user.findMany();

    expect(result.statusCode).toBe(201);
    expect(usuarios.length).toBe(2); // 2 porque existe um usuario logado
  });
});
