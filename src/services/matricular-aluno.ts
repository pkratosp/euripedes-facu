import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';

export type MatricularAlunoRequest = {
  alunoId: string;
  atendido: string;
  telefoneMae: string;
  telefonePai: string | null;
  telefoneRecado: string | null;
  responsavelLegal: string;
  anoMatricula: number;
  documentos?: string[];
};

@Injectable()
export class MatricularAluno {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute(data: MatricularAlunoRequest) {
    await this.repositoryMatricula.matricularAluno(data);
  }
}
