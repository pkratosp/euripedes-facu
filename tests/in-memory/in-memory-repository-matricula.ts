import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { RepositoryPaginaParametros } from '@/repositories/repository-pagina-parametros';
import { MatricularAlunoRequestDto } from '@/services/dto/matricular-aluno-dto';
import { RematricularAlunoRequest } from '@/services/rematricular-aluno';
import { Matriculas } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryRepositoryMatricula implements RepositoryMatricula {
  public matriculas: Matriculas[] = [];

  async matricularAluno(data: MatricularAlunoRequestDto): Promise<void> {
    this.matriculas.push({
      ...data,
      id: randomUUID(),
    });
  }

  async rematricularAluno(data: RematricularAlunoRequest): Promise<void> {
    this.matriculas.push({
      ...data,
      id: randomUUID(),
    });
  }

  async buscarTodasMatriculas({
    page,
  }: RepositoryPaginaParametros): Promise<{
    matriculas: Matriculas[];
    total: number;
  }> {
    const matriculas = this.matriculas.slice((page - 1) * 20, page * 20);

    return {
      matriculas: matriculas,
      total: this.matriculas.length,
    };
  }
}
