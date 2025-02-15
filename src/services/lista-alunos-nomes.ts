import { RepositoryAluno } from '@/repositories/repository-aluno';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListaAlunosNomes {
  constructor(private readonly alunosRepository: RepositoryAluno) {}

  async execute() {
    const { alunos } = await this.alunosRepository.buscarTodosAlunosNomes();

    return {
      alunos,
    };
  }
}
