import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DesmatricularAluno {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute(idMatricula: string) {
    await this.repositoryMatricula.desmatricularAluno(idMatricula);
  }
}
