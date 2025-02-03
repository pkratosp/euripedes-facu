import { RepositoryAluno } from '@/repositories/repository-aluno';
import { Injectable } from '@nestjs/common';
import { Aluno } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CadastrarAlunoRequest } from '@/services/cadastrar-aluno';
import { EditarAlunoRequest } from '@/services/editar-aluno';

@Injectable()
export class RepositoryAlunoPrisma implements RepositoryAluno {
  constructor(private readonly prismaService: PrismaService) {}

  async criarAluno(data: CadastrarAlunoRequest): Promise<void> {
    await this.prismaService.aluno.create({
      data: data,
    });
  }

  async editarAluno(data: EditarAlunoRequest, id: string): Promise<void> {
    await this.prismaService.aluno.update({
      data: data,
      where: {
        id,
      },
    });
  }

  async buscarDadosDoAluno(id: string): Promise<Aluno | null> {
    return await this.prismaService.aluno.findUnique({
      where: {
        id,
      },
    });
  }
}
