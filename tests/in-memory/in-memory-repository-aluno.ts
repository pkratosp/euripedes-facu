import { RepositoryAluno } from '@/repositories/repository-aluno';
import { CadastrarAlunoRequest } from '@/services/cadastrar-aluno';
import { EditarAlunoRequest } from '@/services/editar-aluno';
import { Aluno } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryRepositoryAluno implements RepositoryAluno {
  public alunos: Aluno[] = [];

  async criarAluno(data: CadastrarAlunoRequest): Promise<void> {
    this.alunos.push({
      ...data,
      id: randomUUID(),
    });
  }

  async editarAluno(data: CadastrarAlunoRequest, id: string): Promise<void> {
    const findAluno = this.alunos.findIndex((aluno) => aluno.id === id);

    if (findAluno === -1) {
      throw new Error('Aluno não encontrado');
    }

    this.alunos[findAluno] = {
      id: this.alunos[findAluno].id,
      ...data,
    };
  }
  async buscarDadosDoAluno(id: string): Promise<Aluno | null> {
    const findAluno = this.alunos.find((aluno) => aluno.id === id);
    return findAluno ?? null;
  }
}
