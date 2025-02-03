import { RepositoryAluno } from '@/repositories/repository-aluno';
import { Injectable } from '@nestjs/common';
import { Aluno } from '@prisma/client';
import { z } from 'zod';

const bodyAluno = z.object({
  nome: z.string(),
  sexo: z.string(),
  nis: z.string(),
  dataNascimento: z.string(),
  rg: z.string(),
  cpf: z.string(),
  filiacaoMae: z.string(),
  pai: z.string(),
  responsavel: z.string(),
  rgResponsavel: z.string(),
  cpfResponsavel: z.string(),
  naturalidade: z.string(),
  estado: z.string(),
  ultimaProcedencia: z.string(),
  ra: z.string(),
  escola: z.string(),
  serieEscola: z.string(),
  endereco: z.string(),
  bairro: z.string(),
  cep: z.string(),
  contatos: z.string(),
});

export type CadastrarAlunoRequest = z.infer<typeof bodyAluno>;

@Injectable()
export class CadastrarAluno {
  constructor(private readonly repositoryAluno: RepositoryAluno) {}

  async execute(data: CadastrarAlunoRequest) {
    await this.repositoryAluno.criarAluno(data);
  }
}
