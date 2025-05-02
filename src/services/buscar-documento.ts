import { Injectable } from '@nestjs/common';
import { BuscarDocumentoDto } from './dto/buscar-documento-dto';
import { RepositoryDocumentos } from '@/repositories/repository-documentos';
import { Uploader } from '@/repositories/repository-storage';

@Injectable()
export class BuscarDocumento {
  constructor(
    private readonly repositoryDocumentos: RepositoryDocumentos,
    private readonly uploader: Uploader,
  ) {}

  async execute({ documentoId }: BuscarDocumentoDto) {
    const document =
      await this.repositoryDocumentos.buscarDocumentos(documentoId);

    const { Body, ContentType } = await this.uploader.getDocument(
      document?.url!,
    );

    return {
      Body,
      ContentType,
    };
  }
}
