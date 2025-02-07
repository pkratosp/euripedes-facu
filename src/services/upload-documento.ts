import { RepositoryDocumentos } from '@/repositories/repository-documentos';
import { Uploader } from '@/repositories/repository-storage';

export type UploadDocumentoRequest = {
  fileName: string;
  fileType: string;
  buffer: Buffer;
};

export class UploadDocumento {
  constructor(
    private readonly uploader: Uploader,
    private readonly repositoryDocumentos: RepositoryDocumentos,
  ) {}

  async execute({ buffer, fileName, fileType }: UploadDocumentoRequest) {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      throw new Error('arquivo invalido');
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
