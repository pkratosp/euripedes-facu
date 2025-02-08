import { RepositoryAluno } from '@/repositories/repository-aluno';
import { Injectable } from '@nestjs/common';
import { CadastrarAlunoRequestDto } from './dto/cadastrar-aluno-dto';
import { AlunoExisteError } from './errors/aluno-existe-error';

@Injectable()
export class CadastrarAluno {
  constructor(private readonly repositoryAluno: RepositoryAluno) {}

  async execute(data: CadastrarAlunoRequestDto) {
    const [verificarAlunoCpf, verificarALunoRa, verificarALunoRg] =
      await Promise.all([
        this.repositoryAluno.buscarAlunoPorCpf(data.cpf),
        this.repositoryAluno.buscarAlunoPorRA(data.ra),
        this.repositoryAluno.buscarAlunoPorRG(data.rg),
      ]);

    if (
      verificarALunoRa !== null ||
      verificarALunoRg !== null ||
      verificarAlunoCpf !== null
    ) {
      throw new AlunoExisteError();
    }

    await this.repositoryAluno.criarAluno(data);
  }
}
