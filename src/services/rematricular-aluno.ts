import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';
import { MatricularAlunoRequest } from './matricular-aluno';

export type RematricularAlunoRequest = MatricularAlunoRequest;

@Injectable()
export class RematricularAluno {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute(data: RematricularAlunoRequest) {
    await this.repositoryMatricula.rematricularAluno(data);
  }
}
