import { GetObjectCommandOutput } from '@aws-sdk/client-s3';

export interface UploaderParams {
  fileName: string;
  fileType: string;
  body: Buffer;
}

export abstract class Uploader {
  abstract upload(data: UploaderParams): Promise<{ url: string }>;
  abstract getDocument(documentoId: string): Promise<GetObjectCommandOutput>;
}
