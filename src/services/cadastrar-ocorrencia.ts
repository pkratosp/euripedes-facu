import { RepositoryOcorrencia } from '@/repositories/repository-ocorrencia';
import { Injectable } from '@nestjs/common';
import { Ocorrencias } from '@prisma/client';

@Injectable()
export class CadastrarOcorrencia {
  constructor(private readonly repositoryOcorrencia: RepositoryOcorrencia) {}

  async execute(data: Ocorrencias) {
    await this.repositoryOcorrencia.registrarOcorrencia(data);
  }
}
