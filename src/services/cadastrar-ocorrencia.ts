import { RepositoryOcorrencia } from '@/repositories/repository-ocorrencia';
import { Injectable } from '@nestjs/common';

export type CadastrarOcorrenciaRequest = {
  titulo: string;
  descricao: string;
  dataOcorrencia: Date;
  alunoId: string;
};

@Injectable()
export class CadastrarOcorrencia {
  constructor(private readonly repositoryOcorrencia: RepositoryOcorrencia) {}

  async execute(data: CadastrarOcorrenciaRequest) {
    await this.repositoryOcorrencia.registrarOcorrencia(data);
  }
}
