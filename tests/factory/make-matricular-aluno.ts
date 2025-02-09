import { Matriculas } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';

export function makeMatricularAluno(
  override: Partial<Matriculas>,
  id?: string,
): Matriculas {
  return {
    alunoId: randomUUID(),
    anoMatricula: new Date().getFullYear(),
    atendido: faker.person.fullName(),
    id: id ?? randomUUID(),
    responsavelLegal: faker.person.fullName(),
    telefoneMae: faker.phone.number(),
    telefonePai: faker.phone.number(),
    telefoneRecado: faker.phone.number(),
    ...override,
  };
}

@Injectable()
export class FactoryMatricularAluno {
  constructor(private readonly prismaService: PrismaService) {}

  async makeMatricularAluno(data: Partial<Matriculas> = {}) {
    const matricular = makeMatricularAluno(data);

    await this.prismaService.matriculas.create({
      data: matricular,
    });

    return matricular;
  }
}
