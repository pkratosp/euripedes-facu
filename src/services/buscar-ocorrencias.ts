import { RepositoryOcorrencia } from '@/repositories/repository-ocorrencia';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BuscarOcorrencias {
  constructor(private readonly repositoryOcorrencia: RepositoryOcorrencia) {}

  async execute(idAluno: string) {
    return await this.repositoryOcorrencia.buscarOcorrenciasPorAluno(idAluno);
  }
}
