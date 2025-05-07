import { BuscarTodosDocumentos } from '@/services/buscar-todos-documentos';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('matriculas')
export class BuscarTodosDocumentosMatriculaController {
  constructor(private readonly buscarTodosDocumentos: BuscarTodosDocumentos) {}

  @Get('/:matriculaId/todos/documentos')
  async handle(@Param('matriculaId') matriculaId: string) {
    try {
      return await this.buscarTodosDocumentos.execute({
        matriculaId: matriculaId,
      });
    } catch (error) {
      throw error;
    }
  }
}
