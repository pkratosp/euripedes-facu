import { MatricularAlunoRequestDto } from '@/services/dto/matricular-aluno-dto';
import { RematricularAlunoRequest } from '@/services/rematricular-aluno';
import { Matriculas } from '@prisma/client';
import { RepositoryPaginaParametros } from './repository-pagina-parametros';

export abstract class RepositoryMatricula {
  abstract matricularAluno(data: MatricularAlunoRequestDto): Promise<void>;
  abstract rematricularAluno(data: RematricularAlunoRequest): Promise<void>;
  abstract buscarTodasMatriculas({
    page,
  }: RepositoryPaginaParametros): Promise<{
    matriculas: Matriculas[];
    total: number;
  }>;
}
