import { RepositoryAluno } from '@/repositories/repository-aluno';
import { Injectable } from '@nestjs/common';
import { CadastrarAlunoRequest } from './cadastrar-aluno';

export type EditarAlunoRequest = Partial<CadastrarAlunoRequest>;

@Injectable()
export class EditarAluno {
  constructor(private readonly repositoryAluno: RepositoryAluno) {}

  async execute(data: EditarAlunoRequest, id: string) {
    const buscarAluno = await this.repositoryAluno.buscarDadosDoAluno(id);

    if (buscarAluno === null) {
      throw new Error('Aluno não encontrado');
    }

    const editar = await this.repositoryAluno.editarAluno(data, id);

    return editar;
  }
}
