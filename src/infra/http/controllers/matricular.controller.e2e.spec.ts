import { AppModule } from '@/app.module';
import { PrismaService } from '@/infra/database/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import { FactoryCadastrarAluno } from 'tests/factory/make-cadastrar-aluno';
import request from 'supertest';
import { DatabaseModule } from '@/infra/database/database.module';

describe('Matricular e2e', () => {
  let app: INestApplication;
  let factoryCadastrarAdmin: FactoryCadastrarAdmin;
  let factoryCadastrarAluno: FactoryCadastrarAluno;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [FactoryCadastrarAdmin, FactoryCadastrarAluno],
    }).compile();

    app = moduleRef.createNestApplication();
    factoryCadastrarAdmin = moduleRef.get(FactoryCadastrarAdmin);
    factoryCadastrarAluno = moduleRef.get(FactoryCadastrarAluno);
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  it('[POST] /matriculas', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario.id });

    const aluno = await factoryCadastrarAluno.makeCadastrarAluno();

    const result = await request(app.getHttpServer())
      .post('/matriculas')
      .set('Authorization', `Bearer ${token}`)
      .send({
        alunoId: aluno.id,
        atendido: 'atendio',
        telefoneMae: '312345536',
        telefonePai: null,
        telefoneRecado: null,
        responsavelLegal: 'jhon doe responsavel',
        anoMatricula: 2025,
        // documentos: [],
      });

    const matriculas = await prisma.matriculas.findMany();

    expect(result.statusCode).toBe(201);
    expect(matriculas).toHaveLength(1);
  });
});
