import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma.service';

describe('Criar perguntas', () => {
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

  it('[POST] /formulario/pergunta', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario.id });

    const result = await request(app.getHttpServer())
      .post('/formulario/pergunta')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'pergunta 1',
        descricao: 'descrição da pergunta',
      });

    const perguntas = await prisma.perguntas.findMany();

    expect(result.statusCode).toBe(201);
    expect(perguntas).toHaveLength(1);
  });
});
