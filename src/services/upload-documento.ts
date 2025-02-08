import { RepositoryDocumentos } from '@/repositories/repository-documentos';
import { Uploader } from '@/repositories/repository-storage';
import { UploadDocumentoRequestDto } from './dto/upload-documento-dto';
import { Injectable } from '@nestjs/common';
import { ArquivoInvalidoError } from './errors/arquivo-invalido-error';

@Injectable()
export class UploadDocumento {
  constructor(
    private readonly uploader: Uploader,
    private readonly repositoryDocumentos: RepositoryDocumentos,
  ) {}

  async execute({ buffer, fileName, fileType }: UploadDocumentoRequestDto) {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      throw new ArquivoInvalidoError();
    }

    const upload = await this.uploader.upload({
      body: buffer,
      fileName: fileName,
      fileType: fileType,
    });

    const idDocumento = await this.repositoryDocumentos.documentos(
      fileName,
      upload.url,
    );

    return {
      idDocumento: idDocumento.id,
    };
  }
}
