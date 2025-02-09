import { Aluno } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';

export function makeCadastrarAluno(
  override: Partial<Aluno> = {},
  id?: string,
): Aluno {
  return {
    id: id ?? randomUUID(),
    bairro: faker.location.street(),
    cep: faker.location.zipCode(),
    contatos: faker.phone.number(),
    cpf: randomUUID(),
    cpfResponsavel: randomUUID(),
    dataNascimento: new Date().toString(),
    endereco: faker.location.street(),
    escola: faker.lorem.word(),
    estado: faker.location.state(),
    filiacaoMae: faker.lorem.word(),
    naturalidade: 'brasileiro',
    nis: randomUUID(),
    nome: faker.person.fullName(),
    pai: faker.person.fullName(),
    ra: randomUUID(),
    responsavel: faker.person.fullName(),
    rg: randomUUID(),
    rgResponsavel: randomUUID(),
    serieEscola: '3',
    sexo: faker.person.sexType(),
    ultimaProcedencia: faker.lorem.sentence(),
    ...override,
  };
}

@Injectable()
export class FactoryCadastrarAluno {
  constructor(private readonly prismaService: PrismaService) {}

  async makeCadastrarAluno(data: Partial<Aluno> = {}) {
    const aluno = makeCadastrarAluno(data);

    await this.prismaService.aluno.create({
      data: aluno,
    });

    return aluno;
  }
}
