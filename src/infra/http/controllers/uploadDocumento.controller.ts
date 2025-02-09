import { UploadDocumento } from '@/services/upload-documento';
import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload/documento')
export class UploadDocumentoController {
  constructor(private readonly uploadDocumento: UploadDocumento) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async execute(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 20, // 20 megabyte
          }),
          new FileTypeValidator({
            fileType: '.(png|jpg|jpeg|pdf)',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const idDocumento = await this.uploadDocumento.execute({
        buffer: file.buffer,
        fileName: file.originalname,
        fileType: file.mimetype,
      });

      return idDocumento;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
