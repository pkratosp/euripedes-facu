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

describe('Criar perguntas', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let prisma: PrismaService;
  let factoryCadastrarAdmin: FactoryCadastrarAdmin;
  let factoryCadastrarAluno: FactoryCadastrarAluno;
  let factoryMatricularAluno: FactoryMatricularAluno;
  let factoryCriarPergunta: FactoryCriarPergunta;

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
    factoryCadastrarAdmin = moduleRef.get(FactoryCadastrarAdmin);
    prisma = moduleRef.get(PrismaService);
    factoryCadastrarAluno = moduleRef.get(FactoryCadastrarAluno);
    factoryMatricularAluno = moduleRef.get(FactoryMatricularAluno);
    factoryCriarPergunta = moduleRef.get(FactoryCriarPergunta);

    await app.init();
  });

  it('[POST] /formulario/resposta', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario.id });

    const aluno = await factoryCadastrarAluno.makeCadastrarAluno();

    const matricula = await factoryMatricularAluno.makeMatricularAluno({
      alunoId: aluno.id,
    });

    const pergunta = await factoryCriarPergunta.makeCriarPerguntas();

    const result = await request(app.getHttpServer())
      .post('/formulario/resposta')
      .set('Authorization', `Bearer ${token}`)
      .send({
        resposta: 'resposta 1',
        perguntasId: pergunta.id,
        matriculaId: matricula.id,
      });

    const perguntas = await prisma.perguntas.findMany();

    expect(result.statusCode).toBe(201);
    expect(perguntas).toHaveLength(1);
  });
});
