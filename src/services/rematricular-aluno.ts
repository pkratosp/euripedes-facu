import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';
import { Matriculas } from '@prisma/client';

interface RematricularAlunoRequest extends Matriculas {}

@Injectable()
export class RematricularAluno {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute(data: RematricularAlunoRequest) {
    await this.repositoryMatricula.rematricularAluno(data);
  }
}
