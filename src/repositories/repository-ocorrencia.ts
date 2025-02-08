import { CadastrarOcorrenciaRequestDto } from '@/services/dto/cadastrar-ocorrencia-dto';
import { Ocorrencias } from '@prisma/client';

export abstract class RepositoryOcorrencia {
  abstract registrarOcorrencia(
    data: CadastrarOcorrenciaRequestDto,
  ): Promise<void>;
  abstract buscarOcorrenciasPorAluno(
    idAluno: string,
  ): Promise<Array<Ocorrencias> | []>;
}
