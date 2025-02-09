import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import request from 'supertest';

describe('Login usuario admin e2e', () => {
  let app: INestApplication;
  let factoryCadastrarAdmin: FactoryCadastrarAdmin;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [FactoryCadastrarAdmin],
    }).compile();

    app = moduleRef.createNestApplication();
    factoryCadastrarAdmin = moduleRef.get(FactoryCadastrarAdmin);

    await app.init();
  });

  it('[POST] /login', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin({
      username: 'jhondoe',
      password: '123456',
    });

    const result = await request(app.getHttpServer()).post(`/login`).send({
      username: usuario.username,
      password: usuario.password,
    });

    expect(result.statusCode).toBe(201);
    expect(result.body.access_token).toBeDefined();
  });
});
