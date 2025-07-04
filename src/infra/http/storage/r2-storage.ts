import { EnvService } from '@/infra/env/env.service';
import { Uploader, UploaderParams } from '@/repositories/repository-storage';
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
  GetObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client;

  constructor(private readonly envService: EnvService) {
    const accountId = envService.get('CLOUDFLARE_ACCOUNT_ID');

    this.client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: 'auto',
      credentials: {
        accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async upload(data: UploaderParams): Promise<{ url: string }> {
    const uploadId = randomUUID();

    const uniqueFileName = `${uploadId}-${data.fileName}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: uniqueFileName,
        ContentType: data.fileType,
        Body: data.body,
      }),
    );

    return {
      url: uniqueFileName,
    };
  }

  async getDocument(documentoId: string): Promise<GetObjectCommandOutput> {
    const responseFile = await this.client.send(
      new GetObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: documentoId,
      }),
    );

    return responseFile;
  }
}
