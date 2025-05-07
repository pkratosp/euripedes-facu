import { BuscarTodosDocumentos } from '@/services/buscar-todos-documentos';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('alunos')
export class BuscarTodosDocumentosAlunoController {
  constructor(private readonly buscarTodosDocumentos: BuscarTodosDocumentos) {}

  @Get('/:alunoId/todos/documentos')
  async handle(@Param('alunoId') alunoId: string) {
    try {
      return await this.buscarTodosDocumentos.execute({
        alunoId: alunoId,
      });
    } catch (error) {
      throw error;
    }
  }
}
