import { PrismaService } from '@/infra/database/prisma.service';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Perguntas } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export function makeCriarPerguntas(
  data: Partial<Perguntas> = {},
  id?: string,
): Perguntas {
  return {
    descricao: faker.lorem.sentences(),
    id: id ?? randomUUID(),
    titulo: faker.lorem.slug(),
  };
}

@Injectable()
export class FactoryCriarPergunta {
  constructor(private readonly prismaService: PrismaService) {}

  async makeCriarPerguntas(data: Partial<Perguntas> = {}) {
    const pergunta = makeCriarPerguntas(data);

    await this.prismaService.perguntas.create({
      data: pergunta,
    });

    return pergunta;
  }
}
