import { RepositoryOcorrencia } from '@/repositories/repository-ocorrencia';
import { CadastrarOcorrenciaRequest } from '@/services/cadastrar-ocorrencia';
import { Ocorrencias } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryRepositoryOcorrencia implements RepositoryOcorrencia {
  public ocorrencias: Ocorrencias[] = [];

  async registrarOcorrencia(data: CadastrarOcorrenciaRequest): Promise<void> {
    this.ocorrencias.push({
      ...data,
      id: randomUUID(),
    });
  }
  async buscarOcorrenciasPorAluno(
    idAluno: string,
  ): Promise<Array<Ocorrencias> | []> {
    return this.ocorrencias.filter(
      (ocorrencia) => ocorrencia.alunoId === idAluno,
    );
  }
}
