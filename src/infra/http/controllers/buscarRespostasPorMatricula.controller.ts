import { BuscarRespostasPorMatricula } from '@/services/buscar-respostas-por-matricula';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('/respostas/matricula')
export class BuscarRespostasPorMatriculaController {
  constructor(
    private readonly buscarRespostasPorMatricula: BuscarRespostasPorMatricula,
  ) {}

  @Get(':matriculaId')
  async handle(@Param('matriculaId') matriculaId: string) {
    try {
      const respostas =
        await this.buscarRespostasPorMatricula.execute(matriculaId);

      return respostas;
    } catch (error) {
      throw error;
    }
  }
}
