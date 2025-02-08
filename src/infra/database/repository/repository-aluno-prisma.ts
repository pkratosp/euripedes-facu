import { RepositoryAluno } from '@/repositories/repository-aluno';
import { Injectable } from '@nestjs/common';
import { Aluno } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { EditarAlunoRequest } from '@/services/editar-aluno';
import { CadastrarAlunoRequestDto } from '@/services/dto/cadastrar-aluno-dto';

@Injectable()
export class RepositoryAlunoPrisma implements RepositoryAluno {
  constructor(private readonly prismaService: PrismaService) {}

  async criarAluno(data: CadastrarAlunoRequestDto): Promise<void> {
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

  async buscarAlunoPorCpf(cpf: string): Promise<Aluno | null> {
    return await this.prismaService.aluno.findUnique({
      where: {
        cpf: cpf,
      },
    });
  }

  async buscarAlunoPorRA(ra: string): Promise<Aluno | null> {
    return await this.prismaService.aluno.findUnique({
      where: {
        ra,
      },
    });
  }

  async buscarAlunoPorRG(rg: string): Promise<Aluno | null> {
    return await this.prismaService.aluno.findUnique({
      where: {
        rg,
      },
    });
  }
}
