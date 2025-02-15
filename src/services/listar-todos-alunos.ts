import { RepositoryAluno } from '@/repositories/repository-aluno';
import { ListarTodosAlunosDto } from './dto/listar-todos-alunos-dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListarTodosAlunos {
  constructor(private readonly repositoryAluno: RepositoryAluno) {}

  async execute({ page }: ListarTodosAlunosDto) {
    const { alunos, total } = await this.repositoryAluno.buscarTodosAlunos({
      page,
    });

    return {
      alunos,
      total,
    };
  }
}
