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

  async execute({ alunoId, matriculaId }: BuscarDocumentoDto) {
    const documentosUrls = await this.repositoryDocumentos.buscarDocumentos(
      matriculaId,
      alunoId,
    );

    for (const documento of documentosUrls) {
      const responseDocumento = await this.uploader.getDocument(documento.url);
    }
  }
}
