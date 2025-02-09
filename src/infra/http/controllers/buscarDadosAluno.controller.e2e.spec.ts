import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma.service';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import { FactoryCadastrarAluno } from 'tests/factory/make-cadastrar-aluno';

describe('Buscar dados Aluno e2e', () => {
  let app: INestApplication;

  let factoryCadastrarAluno: FactoryCadastrarAluno;
  let factoryCadastrarAdmin: FactoryCadastrarAdmin;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, AppModule],
      providers: [FactoryCadastrarAdmin, FactoryCadastrarAluno],
    }).compile();

    app = moduleRef.createNestApplication();

    factoryCadastrarAluno = moduleRef.get(FactoryCadastrarAluno);
    factoryCadastrarAdmin = moduleRef.get(FactoryCadastrarAdmin);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  it('[GET] /aluno/:idAluno', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario.id });

    const aluno = await factoryCadastrarAluno.makeCadastrarAluno();

    const result = await request(app.getHttpServer())
      .get(`/aluno/${aluno.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toBeDefined();
  });
});
