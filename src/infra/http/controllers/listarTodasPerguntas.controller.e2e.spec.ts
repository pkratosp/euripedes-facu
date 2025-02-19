import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma.service';
import { FactoryCadastrarAluno } from 'tests/factory/make-cadastrar-aluno';
import { FactoryMatricularAluno } from 'tests/factory/make-matricular-aluno';
import { FactoryCriarPergunta } from 'tests/factory/make-criar-perguntas';

describe('Listar todas as perguntas e2e', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let factoryCadastrarAdmin: FactoryCadastrarAdmin;
  let factoryCriarPergunta: FactoryCriarPergunta;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [FactoryCadastrarAdmin, FactoryCriarPergunta, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    factoryCadastrarAdmin = moduleRef.get(FactoryCadastrarAdmin);
    factoryCriarPergunta = moduleRef.get(FactoryCriarPergunta);

    await app.init();
  });

  it('[GET] /perguntas', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario.id });

    await factoryCriarPergunta.makeCriarPerguntas();
    await factoryCriarPergunta.makeCriarPerguntas();

    const result = await request(app.getHttpServer())
      .get('/perguntas?page=1')
      .set('Authorization', `Bearer ${token}`);

    expect(result.statusCode).toBe(200);
    expect(result.body.perguntas).toHaveLength(2);
  });
});
