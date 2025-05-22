import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';
import { Matriculas } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { RepositoryPaginaParametros } from '@/repositories/repository-pagina-parametros';
import { MatricularAlunoRequestDto } from '@/services/dto/matricular-aluno-dto';
import { EditarDadosMatriculaDto } from '@/services/dto/editar-dados-matricula-dto';

@Injectable()
export class RepositoryMatriculaPrisma implements RepositoryMatricula {
  constructor(private readonly prismaService: PrismaService) {}

  async matricularAluno({
    documentos,
    ...data
  }: MatricularAlunoRequestDto): Promise<{ id: string }> {
    const { id } = await this.prismaService.matriculas.create({
      data: {
        anoMatricula: data.anoMatricula,
        atendido: data.atendido,
        responsavelLegal: data.responsavelLegal,
        telefoneMae: data.telefoneMae,
        alunoId: data.alunoId,
        telefonePai: data.telefonePai,
        telefoneRecado: data.telefoneRecado,
      },
      select: {
        id: true,
      },
    });

    if (documentos) {
      await this.prismaService.documentos.updateMany({
        data: {
          idMatricula: id,
        },
        where: {
          id: {
            in: documentos,
          },
        },
      });
    }

    return {
      id,
    };
  }

  async buscarTodasMatriculas({ page }: RepositoryPaginaParametros): Promise<{
    matriculas: Matriculas[];
    total: number;
  }> {
    const [matriculas, totalMatriculas] = await Promise.all([
      this.prismaService.matriculas.findMany({
        skip: (page - 1) * 20,
        take: 20,
        include: {
          aluno: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
        where: {
          deletado: null,
        },
      }),
      this.prismaService.matriculas.count({
        where: {
          deletado: null,
        },
      }),
    ]);

    return {
      matriculas: matriculas,
      total: totalMatriculas,
    };
  }

  async desmatricularAluno(idMatricula: string): Promise<void> {
    await this.prismaService.matriculas.update({
      data: {
        deletado: new Date(),
      },
      where: {
        id: idMatricula,
      },
    });
  }

  async editarMatricula(
    idMatricula: string,
    { documentos, ...data }: Partial<EditarDadosMatriculaDto>,
  ): Promise<void> {
    await this.prismaService.matriculas.update({
      data: {
        atendido: data.atendido,
        telefoneMae: data.telefoneMae,
        telefonePai: data.telefonePai,
        telefoneRecado: data.telefoneRecado,
        responsavelLegal: data.responsavelLegal,
      },
      where: {
        id: idMatricula,
      },
    });

    if (documentos) {
      await this.prismaService.documentos.updateMany({
        data: {
          idMatricula: idMatricula,
        },
        where: {
          id: {
            in: documentos,
          },
        },
      });
    }
  }

  async rematricularAluno(
    idMatricula: string,
    anoMatricula: number,
  ): Promise<void> {
    await this.prismaService.matriculas.update({
      data: {
        anoMatricula: anoMatricula,
      },
      where: {
        id: idMatricula,
      },
    });
  }

  async buscarMatriculaPorNome(
    name: string,
  ): Promise<{ matriculas: Matriculas[]; total: number }> {
    if (name !== 'vazio') {
      const [matriculas, totalMatriculas] = await Promise.all([
        this.prismaService.$queryRaw<any>`
          select 
            m.*,
            a.id as alunoId,
            a.nome as nomeAluno
          from public."Matriculas" m 
  
          inner join public."Aluno" a on a."id" = m."alunoId"
  
          where a."nome" like ${'%' + name + '%'}
        `,
        this.prismaService.matriculas.count({
          where: {
            deletado: null,
          },
        }),
      ]);

      return {
        matriculas: matriculas.map((matricula) => {
          const _aluno = {
            id: matricula.alunoid,
            nome: matricula.nomealuno,
          };

          delete matricula.alunoid;
          delete matricula.nomealuno;

          const _matricula = {
            ...matricula,
            aluno: _aluno,
          };

          return _matricula;
        }),
        total: totalMatriculas,
      };
    } else {
      const [matriculas, totalMatriculas] = await Promise.all([
        this.prismaService.matriculas.findMany({
          skip: (1 - 1) * 20,
          take: 20,
          include: {
            aluno: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
          where: {
            deletado: null,
          },
        }),
        this.prismaService.matriculas.count({
          where: {
            deletado: null,
          },
        }),
      ]);

      return {
        matriculas: matriculas,
        total: totalMatriculas,
      };
    }
  }
}
