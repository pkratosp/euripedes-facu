import { RepositoryDocumentos } from '@/repositories/repository-documentos';
import { Injectable } from '@nestjs/common';

type BuscarTodosDocumentosType = {
  matriculaId?: string;
  alunoId?: string;
};

@Injectable()
export class BuscarTodosDocumentos {
  constructor(private readonly repositoryDocumentos: RepositoryDocumentos) {}

  async execute({ alunoId, matriculaId }: BuscarTodosDocumentosType) {
    if (alunoId !== undefined) {
      return await this.repositoryDocumentos.todosDocumentosAlunos(alunoId);
    }

    if (matriculaId !== undefined) {
      return await this.repositoryDocumentos.todosDocumentosMatriculas(
        matriculaId,
      );
    }

    return [];
  }
}
