import { RepositoryOcorrencia } from '@/repositories/repository-ocorrencia';
import { CadastrarOcorrenciaRequestDto } from '@/services/dto/cadastrar-ocorrencia-dto';
import { Ocorrencias } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryRepositoryOcorrencia implements RepositoryOcorrencia {
  public ocorrencias: Ocorrencias[] = [];

  async registrarOcorrencia(
    data: CadastrarOcorrenciaRequestDto,
  ): Promise<void> {
    this.ocorrencias.push({
      alunoId: data.alunoId,
      dataOcorrencia: new Date(),
      descricao: data.descricao,
      titulo: data.titulo,
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
