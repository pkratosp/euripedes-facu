import { Ocorrencias } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma.service';

export function makeCadastrarOcorrencia(
  override: Partial<Ocorrencias> = {},
  id?: string,
): Ocorrencias {
  return {
    alunoId: randomUUID(),
    dataOcorrencia: new Date(),
    descricao: faker.lorem.sentences(),
    id: id ?? randomUUID(),
    userId: randomUUID(),
    titulo: faker.lorem.slug(),
    ...override,
  };
}

@Injectable()
export class FactoryCadastrarOcorrencia {
  constructor(private readonly prismaService: PrismaService) {}

  async makeCadastrarOcorrencia(data: Partial<Ocorrencias> = {}) {
    const ocorrencia = makeCadastrarOcorrencia(data);

    await this.prismaService.ocorrencias.create({
      data: ocorrencia,
    });

    return ocorrencia;
  }
}
