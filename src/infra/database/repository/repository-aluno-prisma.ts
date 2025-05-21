import { RepositoryAluno } from '@/repositories/repository-aluno';
import { Injectable } from '@nestjs/common';
import { Aluno } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { EditarAlunoRequest } from '@/services/editar-aluno';
import { CadastrarAlunoRequestDto } from '@/services/dto/cadastrar-aluno-dto';
import { RepositoryPaginaParametros } from '@/repositories/repository-pagina-parametros';

@Injectable()
export class RepositoryAlunoPrisma implements RepositoryAluno {
  constructor(private readonly prismaService: PrismaService) {}

  async criarAluno({
    documentos,
    ...data
  }: CadastrarAlunoRequestDto): Promise<void> {
    const { id } = await this.prismaService.aluno.create({
      data: data,
      select: {
        id: true,
      },
    });

    if (documentos) {
      await this.prismaService.documentos.updateMany({
        data: {
          alunoId: id,
        },
        where: {
          id: {
            in: documentos,
          },
        },
      });
    }
  }

  async editarAluno(
    { documentos, ...data }: EditarAlunoRequest,
    id: string,
  ): Promise<void> {
    await this.prismaService.aluno.update({
      data: data,
      where: {
        id,
      },
    });

    if (documentos) {
      await this.prismaService.documentos.updateMany({
        data: {
          alunoId: id,
        },
        where: {
          id: {
            in: documentos,
          },
        },
      });
    }
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

  async buscarTodosAlunos({
    page,
  }: RepositoryPaginaParametros): Promise<{ alunos: Aluno[]; total: number }> {
    const [alunos, totalAlunos] = await Promise.all([
      this.prismaService.aluno.findMany({
        skip: (page - 1) * 20,
        take: 20,
      }),
      this.prismaService.aluno.count(),
    ]);

    return {
      alunos: alunos,
      total: totalAlunos,
    };
  }

  async buscarTodosAlunosNomes(): Promise<{
    alunos: Array<{ id: string; nome: string }>;
  }> {
    const alunos = await this.prismaService.aluno.findMany({
      select: {
        id: true,
        nome: true,
      },
    });

    return {
      alunos: alunos,
    };
  }
}
