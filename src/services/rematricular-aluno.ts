import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';
import { MatricularAlunoRequestDto } from './dto/matricular-aluno-dto';

export type RematricularAlunoRequest = MatricularAlunoRequestDto;

@Injectable()
export class RematricularAluno {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute(data: RematricularAlunoRequest) {
    await this.repositoryMatricula.rematricularAluno(data);
  }
}
