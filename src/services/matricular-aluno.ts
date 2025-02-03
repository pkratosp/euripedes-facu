import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';
import { Matriculas } from '@prisma/client';

interface MatricularAlunoRequest extends Matriculas {}

@Injectable()
export class MatricularAluno {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute(data: MatricularAlunoRequest) {
    await this.repositoryMatricula.matricularAluno(data);
  }
}
