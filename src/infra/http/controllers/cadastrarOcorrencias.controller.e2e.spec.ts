import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import { FactoryCadastrarAluno } from 'tests/factory/make-cadastrar-aluno';
import request from 'supertest';

describe('Cadastrar ocorrencia e2e', async () => {
  let app: INestApplication;
  let jwt: JwtService;
  let prisma: PrismaService;
  let factoryCadastrarAdmin: FactoryCadastrarAdmin;
  let factoryCadastrarAluno: FactoryCadastrarAluno;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [FactoryCadastrarAdmin, FactoryCadastrarAluno],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    prisma = moduleRef.get(PrismaService);
    factoryCadastrarAdmin = moduleRef.get(FactoryCadastrarAdmin);
    factoryCadastrarAluno = moduleRef.get(FactoryCadastrarAluno);

    await app.init();
  });

  it('[POST] /ocorrencias', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario });

    const aluno = await factoryCadastrarAluno.makeCadastrarAluno();

    const result = await request(app.getHttpServer())
      .post(`/ocorrencias`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'titulo da ocorrencia',
        descricao: 'descrição',
        alunoId: aluno.id,
      });

    const ocorrencias = await prisma.ocorrencias.findMany();

    expect(result.statusCode).toEqual(201);
    expect(ocorrencias).toHaveLength(1);
  });
});
