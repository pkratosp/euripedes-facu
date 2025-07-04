import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RematricularAluno {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute(idMatricula: string, anoMatricula: number) {
    await this.repositoryMatricula.rematricularAluno(idMatricula, anoMatricula);
  }
}
