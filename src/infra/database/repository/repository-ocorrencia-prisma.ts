import { RepositoryOcorrencia } from '@/repositories/repository-ocorrencia';
import { Injectable } from '@nestjs/common';
import { Ocorrencias } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CadastrarOcorrenciaRequestDto } from '@/services/dto/cadastrar-ocorrencia-dto';

@Injectable()
export class RepositoryOcorrenciaPrisma implements RepositoryOcorrencia {
  constructor(private readonly prismaService: PrismaService) {}

  async registrarOcorrencia(
    data: CadastrarOcorrenciaRequestDto,
  ): Promise<void> {
    await this.prismaService.ocorrencias.create({
      data: {
        descricao: data.descricao,
        titulo: data.titulo,
        alunoId: data.alunoId,
        userId: data.userId,
      },
    });
  }

  async buscarOcorrenciasPorAluno(
    idAluno: string,
  ): Promise<Array<Ocorrencias> | []> {
    return await this.prismaService.ocorrencias.findMany({
      where: {
        alunoId: idAluno,
      },
      include: {
        User: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  }
}
