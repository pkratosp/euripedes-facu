import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma.service';
import { FactoryCadastrarAluno } from 'tests/factory/make-cadastrar-aluno';

describe('Listar somente nomes dos alunos e2e', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let factoryCadastrarAdmin: FactoryCadastrarAdmin;
  let factoryCadastrarAluno: FactoryCadastrarAluno;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [FactoryCadastrarAdmin, FactoryCadastrarAluno, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    factoryCadastrarAdmin = moduleRef.get(FactoryCadastrarAdmin);
    factoryCadastrarAluno = moduleRef.get(FactoryCadastrarAluno);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  it('[GET] /alunos/nomes', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario.id });

    await factoryCadastrarAluno.makeCadastrarAluno();
    await factoryCadastrarAluno.makeCadastrarAluno();
    await factoryCadastrarAluno.makeCadastrarAluno();
    await factoryCadastrarAluno.makeCadastrarAluno();

    const result = await request(app.getHttpServer())
      .get('/alunos/nomes')
      .set('Authorization', `Bearer ${token}`);

    expect(result.statusCode).toBe(200);
    expect(result.body.alunos).toHaveLength(4);
  });
});
