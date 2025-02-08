import { RepositoryMatricula } from '@/repositories/repository-matricula';
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
}
