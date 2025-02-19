import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import { FactoryCadastrarAluno } from 'tests/factory/make-cadastrar-aluno';
import { FactoryCadastrarOcorrencia } from 'tests/factory/make-cadastrar-ocorrencia';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma.service';
import { FactoryMatricularAluno } from 'tests/factory/make-matricular-aluno';
import { FactoryCriarPergunta } from 'tests/factory/make-criar-perguntas';

describe('Buscar resposta por matricula e2e', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let factoryCadastrarAdmin: FactoryCadastrarAdmin;
  let factoryCadastrarAluno: FactoryCadastrarAluno;
  let factoryMatricularAluno: FactoryMatricularAluno;
  let factoryCriarPergunta: FactoryCriarPergunta;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        FactoryCadastrarAdmin,
        FactoryCadastrarAluno,
        FactoryMatricularAluno,
        FactoryCriarPergunta,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    jwt = moduleRef.get(JwtService);
    prisma = moduleRef.get(PrismaService);
    factoryCadastrarAdmin = moduleRef.get(FactoryCadastrarAdmin);
    factoryCadastrarAluno = moduleRef.get(FactoryCadastrarAluno);
    factoryMatricularAluno = moduleRef.get(FactoryMatricularAluno);
    factoryCriarPergunta = moduleRef.get(FactoryCriarPergunta);

    await app.init();
  });

  it('[GET] /respostas/matricula/:matriculaId', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario.id });

    const aluno = await factoryCadastrarAluno.makeCadastrarAluno();

    const matricular = await factoryMatricularAluno.makeMatricularAluno({
      alunoId: aluno.id,
    });

    const perguntas = await factoryCriarPergunta.makeCriarPerguntas();

    await prisma.respostas.create({
      data: {
        resposta: 'resposta da pergunta 1',
        perguntasId: perguntas.id,
        matriculasId: matricular.id,
      },
    });

    const result = await request(app.getHttpServer())
      .get(`/respostas/matricula/${matricular.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveLength(1);
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          resposta: expect.any(String),
          perguntasId: expect.any(String),
          matriculasId: expect.any(String),
          Perguntas: {
            id: expect.any(String),
            titulo: expect.any(String),
            descricao: expect.any(String),
          },
        }),
      ]),
    );
  });
});
