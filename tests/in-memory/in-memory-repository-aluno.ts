import { RepositoryAluno } from '@/repositories/repository-aluno';
import { RepositoryPaginaParametros } from '@/repositories/repository-pagina-parametros';
import { CadastrarAlunoRequestDto } from '@/services/dto/cadastrar-aluno-dto';
import { Aluno } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryRepositoryAluno implements RepositoryAluno {
  public alunos: Aluno[] = [];

  async criarAluno(data: CadastrarAlunoRequestDto): Promise<void> {
    this.alunos.push({
      ...data,
      id: randomUUID(),
    });
  }

  async editarAluno(data: CadastrarAlunoRequestDto, id: string): Promise<void> {
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

  async buscarAlunoPorCpf(cpf: string): Promise<Aluno | null> {
    const findAluno = this.alunos.find((aluno) => aluno.cpf === cpf);
    return findAluno ?? null;
  }

  async buscarAlunoPorRA(ra: string): Promise<Aluno | null> {
    const findAluno = this.alunos.find((aluno) => aluno.ra === ra);
    return findAluno ?? null;
  }

  async buscarAlunoPorRG(rg: string): Promise<Aluno | null> {
    const findAluno = this.alunos.find((aluno) => aluno.rg === rg);
    return findAluno ?? null;
  }

  async buscarTodosAlunos({
    page,
  }: RepositoryPaginaParametros): Promise<{ alunos: Aluno[]; total: number }> {
    const alunos = this.alunos.slice((page - 1) * 20, page * 20);

    return {
      alunos: alunos,
      total: this.alunos.length,
    };
  }

  async buscarTodosAlunosNomes(): Promise<{
    alunos: Array<{ id: string; nome: string }>;
  }> {
    const alunos = this.alunos.map((aluno) => {
      return {
        id: aluno.id,
        nome: aluno.nome,
      };
    });

    return {
      alunos: alunos,
    };
  }

  buscarAlunoPorNome(
    name: string,
  ): Promise<{ alunos: Aluno[]; total: number }> {
    throw new Error('Method not implemented.');
  }
}
