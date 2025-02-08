import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RepositoryDocumentos } from '@/repositories/repository-documentos';

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
}
