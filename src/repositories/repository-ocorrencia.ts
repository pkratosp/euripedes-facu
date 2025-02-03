import { Ocorrencias } from '@prisma/client';

export abstract class RepositoryOcorrencia {
  abstract registrarOcorrencia(data: Ocorrencias): Promise<void>;
  abstract buscarOcorrenciasPorAluno(
    idAluno: string,
  ): Promise<Array<Ocorrencias> | []>;
}
