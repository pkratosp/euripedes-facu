import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';
import { Matriculas } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { RepositoryPaginaParametros } from '@/repositories/repository-pagina-parametros';
import { MatricularAlunoRequestDto } from '@/services/dto/matricular-aluno-dto';

@Injectable()
export class RepositoryMatriculaPrisma implements RepositoryMatricula {
  constructor(private readonly prismaService: PrismaService) {}

  async matricularAluno(data: MatricularAlunoRequestDto): Promise<void> {
    await this.prismaService.matriculas.create({
      data: {
        anoMatricula: data.anoMatricula,
        atendido: data.atendido,
        responsavelLegal: data.responsavelLegal,
        telefoneMae: data.telefoneMae,
        alunoId: data.alunoId,
        telefonePai: data.telefonePai,
        telefoneRecado: data.telefoneRecado,
      },
    });
  }

  async rematricularAluno(data: Matriculas): Promise<void> {
    await this.prismaService.matriculas.create({
      data: data,
    });
  }

  async buscarTodasMatriculas({ page }: RepositoryPaginaParametros): Promise<{
    matriculas: Matriculas[];
    total: number;
  }> {
    const [matriculas, totalMatriculas] = await Promise.all([
      this.prismaService.matriculas.findMany({
        skip: (page - 1) * 20,
        take: 20,
      }),
      this.prismaService.matriculas.count(),
    ]);

    return {
      matriculas: matriculas,
      total: totalMatriculas,
    };
  }
}
