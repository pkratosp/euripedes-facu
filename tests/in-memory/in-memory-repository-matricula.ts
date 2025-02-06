import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { MatricularAlunoRequest } from '@/services/matricular-aluno';
import { RematricularAlunoRequest } from '@/services/rematricular-aluno';
import { Matriculas } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryRepositoryMatricula implements RepositoryMatricula {
  public matriculas: Matriculas[] = [];

  async matricularAluno(data: MatricularAlunoRequest): Promise<void> {
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
