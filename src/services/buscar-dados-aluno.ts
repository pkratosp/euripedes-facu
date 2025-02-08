import { RepositoryAluno } from '@/repositories/repository-aluno';
import { Injectable } from '@nestjs/common';
import { AlunoNaoEncontradoError } from './errors/aluno-nao-encontrado-error';

@Injectable()
export class BuscarDadosAluno {
  constructor(private readonly repositoryAluno: RepositoryAluno) {}

  async execute(idAluno: string) {
    const aluno = await this.repositoryAluno.buscarDadosDoAluno(idAluno);

    if (aluno === null) {
      throw new AlunoNaoEncontradoError();
    }

    return aluno;
  }
}
