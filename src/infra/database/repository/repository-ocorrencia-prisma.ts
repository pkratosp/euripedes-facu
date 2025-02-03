import { RepositoryOcorrencia } from '@/repositories/repository-ocorrencia';
import { Injectable } from '@nestjs/common';
import { Ocorrencias } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RepositoryOcorrenciaPrisma implements RepositoryOcorrencia {
  constructor(private readonly prismaService: PrismaService) {}

  async registrarOcorrencia(data: Ocorrencias): Promise<void> {
    await this.prismaService.ocorrencias.create({
      data: data,
    });
  }

  async buscarOcorrenciasPorAluno(
    idAluno: string,
  ): Promise<Array<Ocorrencias> | []> {
    return await this.prismaService.ocorrencias.findMany({
      where: {
        alunoId: idAluno,
      },
    });
  }
}
