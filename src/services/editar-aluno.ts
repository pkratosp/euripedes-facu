import { RepositoryAluno } from '@/repositories/repository-aluno';
import { Injectable } from '@nestjs/common';
import { CadastrarAlunoRequestDto } from './dto/cadastrar-aluno-dto';
import { AlunoNaoEncontradoError } from './errors/aluno-nao-encontrado-error';

export type EditarAlunoRequest = Partial<CadastrarAlunoRequestDto>;

@Injectable()
export class EditarAluno {
  constructor(private readonly repositoryAluno: RepositoryAluno) {}

  async execute(data: EditarAlunoRequest, id: string) {
    const buscarAluno = await this.repositoryAluno.buscarDadosDoAluno(id);

    if (buscarAluno === null) {
      throw new AlunoNaoEncontradoError();
    }

    const editar = await this.repositoryAluno.editarAluno(data, id);

    return editar;
  }
}
