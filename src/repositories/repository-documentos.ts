export abstract class RepositoryDocumentos {
  abstract documentos(
    nomeArquivo: string,
    url: string,
  ): Promise<{
    id: string;
  }>;
}
