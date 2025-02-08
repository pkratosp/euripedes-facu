import { MatricularAlunoRequestDto } from '@/services/dto/matricular-aluno-dto';
import { RematricularAlunoRequest } from '@/services/rematricular-aluno';

export abstract class RepositoryMatricula {
  abstract matricularAluno(data: MatricularAlunoRequestDto): Promise<void>;
  abstract rematricularAluno(data: RematricularAlunoRequest): Promise<void>;
}
