import { RepositoryAluno } from '@/repositories/repository-aluno';
import { Injectable } from '@nestjs/common';

export type CadastrarAlunoRequest = {
  nome: string;
  sexo: string;
  nis: string;
  dataNascimento: string;
  rg: string;
  cpf: string;
  filiacaoMae: string;
  pai: string;
  responsavel: string;
  rgResponsavel: string;
  cpfResponsavel: string;
  naturalidade: string;
  estado: string;
  ultimaProcedencia: string;
  ra: string;
  escola: string;
  serieEscola: string;
  endereco: string;
  bairro: string;
  cep: string;
  contatos: string;
};

@Injectable()
export class CadastrarAluno {
  constructor(private readonly repositoryAluno: RepositoryAluno) {}

  async execute(data: CadastrarAlunoRequest) {
    await this.repositoryAluno.criarAluno(data);
  }
}
