import { RepositoryAluno } from '@/repositories/repository-aluno';
import { Injectable } from '@nestjs/common';

type BuscarNomeAlunoType = {
  name: string;
};

@Injectable()
export class BuscarNomeAluno {
  constructor(private readonly repositoryAluno: RepositoryAluno) {}

  async execute({ name }: BuscarNomeAlunoType) {
    const { alunos, total } =
      await this.repositoryAluno.buscarAlunoPorNome(name);

    return {
      alunos,
      total,
    };
  }
}
