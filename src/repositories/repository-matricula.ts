import { MatricularAlunoRequest } from '@/services/matricular-aluno';
import { RematricularAlunoRequest } from '@/services/rematricular-aluno';

export abstract class RepositoryMatricula {
  abstract matricularAluno(data: MatricularAlunoRequest): Promise<void>;
  abstract rematricularAluno(data: RematricularAlunoRequest): Promise<void>;
}
