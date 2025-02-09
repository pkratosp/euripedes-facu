import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import { FactoryCadastrarAluno } from 'tests/factory/make-cadastrar-aluno';
import { FactoryCadastrarOcorrencia } from 'tests/factory/make-cadastrar-ocorrencia';
import request from 'supertest';

describe('Buscar ocorrencia e2e', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let factoryCadastrarOcorrencia: FactoryCadastrarOcorrencia;
  let factoryCadastrarAdmin: FactoryCadastrarAdmin;
  let factoryCadastrarAluno: FactoryCadastrarAluno;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        FactoryCadastrarOcorrencia,
        FactoryCadastrarAdmin,
        FactoryCadastrarAluno,
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    jwt = moduleRef.get(JwtService);
    factoryCadastrarOcorrencia = moduleRef.get(FactoryCadastrarOcorrencia);
    factoryCadastrarAdmin = moduleRef.get(FactoryCadastrarAdmin);
    factoryCadastrarAluno = moduleRef.get(FactoryCadastrarAluno);

    await app.init();
  });

  it('[GET] /ocorrencias/:alunoId', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario.id });

    const aluno = await factoryCadastrarAluno.makeCadastrarAluno();

    await factoryCadastrarOcorrencia.makeCadastrarOcorrencia({
      alunoId: aluno.id,
    });

    const result = await request(app.getHttpServer())
      .get(`/ocorrencias/${aluno.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(result.statusCode).toBe(200);
    expect(result.body).toHaveLength(1);
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          titulo: expect.any(String),
          descricao: expect.any(String),
        }),
      ]),
    );
  });
});
