import { Documentos } from '@prisma/client';

export abstract class RepositoryDocumentos {
  abstract documentos(
    nomeArquivo: string,
    url: string,
  ): Promise<{
    id: string;
  }>;
  abstract buscarDocumentos(
    matriculaId?: string,
    alunoId?: string,
  ): Promise<Documentos[] | []>;
}
