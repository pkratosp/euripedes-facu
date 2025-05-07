import { Documentos } from '@prisma/client';

export abstract class RepositoryDocumentos {
  abstract documentos(
    nomeArquivo: string,
    url: string,
  ): Promise<{
    id: string;
  }>;
  abstract buscarDocumentos(idDocumento: string): Promise<Documentos | null>;
  abstract todosDocumentosMatriculas(
    matriculaId: string,
  ): Promise<Documentos[]>;
  abstract todosDocumentosAlunos(alunoId: string): Promise<Documentos[]>;
}
