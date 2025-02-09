import { AppModule } from '@/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { FactoryCadastrarAdmin } from 'tests/factory/make-cadastrar-admin';
import request from 'supertest';
import { PrismaService } from '@/infra/database/prisma.service';

describe('Cadastrar aluno e2e', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let factoryCadastrarAdmin: FactoryCadastrarAdmin;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [FactoryCadastrarAdmin, PrismaService],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    factoryCadastrarAdmin = moduleRef.get(FactoryCadastrarAdmin);
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  it('[POST] /aluno', async () => {
    const usuario = await factoryCadastrarAdmin.makePrismaCadastrarAdmin();

    const token = await jwt.signAsync({ sub: usuario.id });

    const result = await request(app.getHttpServer())
      .post('/aluno')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'jhon doe',
        sexo: 'm',
        nis: '49809409832',
        dataNascimento: '25/06/2018',
        rg: '10.444.637-7',
        cpf: '898.099.980-15',
        filiacaoMae: 'string',
        pai: 'string',
        responsavel: 'string',
        rgResponsavel: '24.729.121-3',
        cpfResponsavel: '355.779.560-80',
        naturalidade: 'brasileiro',
        estado: 'sp',
        ultimaProcedencia: 'aqui',
        ra: '49048023',
        escola: 'escola teste',
        serieEscola: '4',
        endereco: 'general',
        bairro: 'quartel',
        cep: '15061-752',
        contatos: '12902133',
      });

    const alunoCadastrado = await prisma.aluno.findUnique({
      where: {
        cpf: '898.099.980-15',
      },
    });

    expect(result.statusCode).toBe(201);
    expect(alunoCadastrado?.id).toBeDefined();
  });
});
