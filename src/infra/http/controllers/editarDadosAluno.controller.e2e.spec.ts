import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma.service';
import { FactoryCadastrarAluno } from 'tests/factory/make-cadastrar-aluno';

describe('Editar aluno e2e', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let factoryCadastrarAdmin: FactoryCadastrarAdmin;
  let prisma: PrismaService;
  let factoryCadastrarAluno: FactoryCadastrarAluno;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [FactoryCadastrarAdmin, FactoryCadastrarAluno, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    factoryCadastrarAdmin = moduleRef.get(FactoryCadastrarAdmin);
    prisma = moduleRef.get(PrismaService);
    factoryCadastrarAluno = moduleRef.get(FactoryCadastrarAluno);

    await app.init();
  });

  it('[PUT] /aluno/:idAluno', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario.id });

    const aluno = await factoryCadastrarAluno.makeCadastrarAluno({
      cpf: '898.099.980-15',
    });

    const result = await request(app.getHttpServer())
      .put(`/aluno/${aluno.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        escola: 'escola teste editado',
        serieEscola: '5',
      });

    const alunoCadastrado = await prisma.aluno.findUnique({
      where: {
        cpf: '898.099.980-15',
      },
    });

    expect(result.statusCode).toBe(200);
    expect(alunoCadastrado?.id).toBeDefined();
    expect(alunoCadastrado?.escola).toBe('escola teste editado');
    expect(alunoCadastrado?.serieEscola).toBe('5');
  });
});
