import { BuscarDocumento } from '@/services/buscar-documento';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('matriculas/documentos')
export class BuscarDocumentosController {
  constructor(private readonly buscarDocumento: BuscarDocumento) {}

  @Get(':documentoId')
  async handle(
    @Param('documentoId') documentoId: string,
    @Res() res: Response,
  ) {
    try {
      const { Body, ContentType } = await this.buscarDocumento.execute({
        documentoId: documentoId,
      });

      res.set({
        'Content-Type': ContentType || 'application/octet-stream',
      });

      return (Body as NodeJS.ReadableStream).pipe(res);
    } catch (error) {
      throw error;
    }
  }
}
