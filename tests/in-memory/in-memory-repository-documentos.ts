import { RepositoryDocumentos } from '@/repositories/repository-documentos';
import { Documentos } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryRepositoryDocumentos implements RepositoryDocumentos {
  public documentosArquivo: Documentos[] = [];

  async documentos(nomeArquivo: string, url: string): Promise<{ id: string }> {
    const idDocumento = randomUUID();
    this.documentosArquivo.push({
      alunoId: '',
      id: idDocumento,
      idMatricula: '',
      nomeArquivo: nomeArquivo,
      url: url,
    });

    return {
      id: idDocumento,
    };
  }

  buscarDocumentos(idDocumento: string): Promise<Documentos | null> {
    throw new Error('not implemented');
  }

  async todosDocumentosMatriculas(matriculaId: string): Promise<Documentos[]> {
    return this.documentosArquivo.filter(
      (documento) => documento.idMatricula === matriculaId,
    );
  }
  async todosDocumentosAlunos(alunoId: string): Promise<Documentos[]> {
    return this.documentosArquivo.filter(
      (documento) => documento.alunoId === alunoId,
    );
  }
}
