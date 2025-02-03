import { RepositoryFormulario } from '@/repositories/repository-formulario';
import { Injectable } from '@nestjs/common';
import { Perguntas, Respostas } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RepositoryFormularioPrisma implements RepositoryFormulario {
  constructor(private readonly prismaService: PrismaService) {}

  async cadastrarPergunta(data: Perguntas): Promise<void> {
    await this.prismaService.perguntas.create({
      data: data,
    });
  }
  async registarResposta(data: Respostas): Promise<void> {
    await this.prismaService.respostas.create({
      data: data,
    });
  }
  async buscarRepostasPorMatricula(
    idMatricula: string,
  ): Promise<Respostas[] | []> {
    return await this.prismaService.respostas.findMany({
      where: {
        Perguntas: {
          matriculaId: idMatricula,
        },
      },
    });
  }

  async buscarPerguntas(): Promise<Perguntas[]> {
    return await this.prismaService.perguntas.findMany();
  }

  async removerPergunta(idPergunta: string): Promise<void> {
    await this.prismaService.perguntas.delete({
      where: {
        id: idPergunta,
      },
    });
  }

  async removerResposta(idResposta: string) {
    await this.prismaService.respostas.delete({
      where: {
        id: idResposta,
      },
    });
  }
}
