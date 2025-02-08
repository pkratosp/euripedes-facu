import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';
import { MatricularAlunoRequestDto } from './dto/matricular-aluno-dto';

@Injectable()
export class MatricularAluno {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute(data: MatricularAlunoRequestDto) {
    await this.repositoryMatricula.matricularAluno(data);
  }
}
