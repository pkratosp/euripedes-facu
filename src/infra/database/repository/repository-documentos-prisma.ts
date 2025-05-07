import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RepositoryDocumentos } from '@/repositories/repository-documentos';
import { Documentos } from '@prisma/client';

@Injectable()
export class RepositoryDocumentosPrisma implements RepositoryDocumentos {
  constructor(private readonly prismaService: PrismaService) {}

  async documentos(nomeArquivo: string, url: string): Promise<{ id: string }> {
    const documento = await this.prismaService.documentos.create({
      data: {
        nomeArquivo: nomeArquivo,
        url: url,
      },
    });

    return {
      id: documento.id,
    };
  }

  async buscarDocumentos(idDocumento: string): Promise<Documentos | null> {
    const documentos = await this.prismaService.documentos.findUnique({
      where: {
        id: idDocumento,
      },
      select: {
        id: true,
        nomeArquivo: true,
        url: true,
        idMatricula: true,
        alunoId: true,
      },
    });

    return documentos;
  }

  async todosDocumentosMatriculas(matriculaId: string): Promise<Documentos[]> {
    const documentos = await this.prismaService.documentos.findMany({
      where: {
        idMatricula: matriculaId,
      },
    });

    return documentos;
  }

  async todosDocumentosAlunos(alunoId: string): Promise<Documentos[]> {
    const documentos = await this.prismaService.documentos.findMany({
      where: {
        alunoId: alunoId,
      },
    });

    return documentos;
  }
}
