import { MatricularAlunoRequestDto } from '@/services/dto/matricular-aluno-dto';
import { Matriculas } from '@prisma/client';
import { RepositoryPaginaParametros } from './repository-pagina-parametros';
import { EditarDadosMatriculaDto } from '@/services/dto/editar-dados-matricula-dto';

export abstract class RepositoryMatricula {
  abstract matricularAluno(
    data: MatricularAlunoRequestDto,
  ): Promise<{ id: string }>;
  abstract editarMatricula(
    idMatricula: string,
    data: Partial<EditarDadosMatriculaDto>,
  ): Promise<void>;
  abstract rematricularAluno(
    idMatricula: string,
    anoMatricula: number,
  ): Promise<void>;
  abstract desmatricularAluno(idMatricula: string): Promise<void>;
  abstract buscarTodasMatriculas({
    page,
  }: RepositoryPaginaParametros): Promise<{
    matriculas: Matriculas[];
    total: number;
  }>;
}
