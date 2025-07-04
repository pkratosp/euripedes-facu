import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import request from 'supertest';
import { FactoryCadastrarAluno } from 'tests/factory/make-cadastrar-aluno';
import { FactoryMatricularAluno } from 'tests/factory/make-matricular-aluno';

describe('Listar todas as matriculas e2e', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let factoryCadastrarAdmin: FactoryCadastrarAdmin;
  let factoryCadastrarAluno: FactoryCadastrarAluno;
  let factoryMatricularAluno: FactoryMatricularAluno;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        FactoryCadastrarAdmin,
        FactoryCadastrarAluno,
        FactoryMatricularAluno,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    factoryCadastrarAdmin = moduleRef.get(FactoryCadastrarAdmin);
    factoryCadastrarAluno = moduleRef.get(FactoryCadastrarAluno);
    factoryMatricularAluno = moduleRef.get(FactoryMatricularAluno);

    await app.init();
  });

  it('[GET] /matriculas', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario.id });

    const aluno1 = await factoryCadastrarAluno.makeCadastrarAluno();
    const aluno2 = await factoryCadastrarAluno.makeCadastrarAluno();

    await factoryMatricularAluno.makeMatricularAluno({ alunoId: aluno1.id });
    await factoryMatricularAluno.makeMatricularAluno({ alunoId: aluno2.id });

    const result = await request(app.getHttpServer())
      .get('/matriculas?page=1')
      .set('Authorization', `Bearer ${token}`);

    expect(result.statusCode).toBe(200);
    expect(result.body.matriculas).toHaveLength(2);
    expect(result.body.total).toBe(2);
  });
});
