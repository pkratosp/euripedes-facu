import { CadastrarOcorrenciaRequest } from '@/services/cadastrar-ocorrencia';
import { Ocorrencias } from '@prisma/client';

export abstract class RepositoryOcorrencia {
  abstract registrarOcorrencia(data: CadastrarOcorrenciaRequest): Promise<void>;
  abstract buscarOcorrenciasPorAluno(
    idAluno: string,
  ): Promise<Array<Ocorrencias> | []>;
}
