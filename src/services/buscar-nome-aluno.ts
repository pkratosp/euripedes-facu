import { RepositoryAluno } from '@/repositories/repository-aluno';
import { Injectable } from '@nestjs/common';
import { BuscarNomeAlunoDto } from './dto/buscar-nome-aluno-dto';

@Injectable()
export class BuscarNomeAluno {
  constructor(private readonly repositoryAluno: RepositoryAluno) {}

  async execute({ name }: BuscarNomeAlunoDto) {
    const { alunos, total } =
      await this.repositoryAluno.buscarAlunoPorNome(name);

    return {
      alunos,
      total,
    };
  }
}
