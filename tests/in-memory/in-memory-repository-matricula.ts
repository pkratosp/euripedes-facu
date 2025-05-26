import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { RepositoryPaginaParametros } from '@/repositories/repository-pagina-parametros';
import { EditarDadosMatriculaDto } from '@/services/dto/editar-dados-matricula-dto';
import { MatricularAlunoRequestDto } from '@/services/dto/matricular-aluno-dto';
import { Matriculas } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryRepositoryMatricula implements RepositoryMatricula {
  public matriculas: Matriculas[] = [];

  async matricularAluno(
    data: MatricularAlunoRequestDto,
  ): Promise<{ id: string }> {
    const id = randomUUID();
    this.matriculas.push({
      ...data,
      deletado: null,
      id: id,
    });

    return {
      id,
    };
  }

  async buscarTodasMatriculas({ page }: RepositoryPaginaParametros): Promise<{
    matriculas: Matriculas[];
    total: number;
  }> {
    const matriculas = this.matriculas
      .filter((matricula) => matricula.deletado === null)
      .slice((page - 1) * 20, page * 20);

    return {
      matriculas: matriculas,
      total: this.matriculas.length,
    };
  }

  async desmatricularAluno(idMatricula: string): Promise<void> {
    const matriculaId = this.matriculas.findIndex(
      (matricula) => matricula.id === idMatricula,
    );

    this.matriculas[matriculaId] = {
      ...this.matriculas[matriculaId],
      deletado: new Date(),
    };
  }

  async editarMatricula(
    idMatricula: string,
    data: Partial<EditarDadosMatriculaDto>,
  ): Promise<void> {
    const matriculaId = this.matriculas.findIndex(
      (matricula) => matricula.id === idMatricula,
    );

    this.matriculas[matriculaId] = {
      ...this.matriculas[matriculaId],
      ...data,
    };
  }

  async rematricularAluno(
    idMatricula: string,
    anoMatricula: number,
  ): Promise<void> {
    const matriculaId = this.matriculas.findIndex(
      (matricula) => matricula.id === idMatricula,
    );

    this.matriculas[matriculaId] = {
      ...this.matriculas[matriculaId],
      anoMatricula: anoMatricula,
    };
  }

  buscarMatriculaPorNome(
    name: string,
  ): Promise<{ matriculas: Matriculas[]; total: number }> {
    throw new Error('Method not implemented.');
  }

  buscarTodasMatriculasDeletadas({
    page,
  }: RepositoryPaginaParametros): Promise<{
    matriculas: Matriculas[];
    total: number;
  }> {
    throw new Error('Method not implemented.');
  }

  buscarDesmatriculadosPorNome(
    name: string,
  ): Promise<{ matriculas: Matriculas[]; total: number }> {
    throw new Error('Method not implemented.');
  }
}
