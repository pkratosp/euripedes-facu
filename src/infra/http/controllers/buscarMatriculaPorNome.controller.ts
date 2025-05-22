import { BuscarMatriculaPorNome } from '@/services/buscar-matricula-por-nome';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('/matriculas')
export class BuscarMatriculaPorNomeController {
  constructor(
    private readonly buscarMatriculaPorNome: BuscarMatriculaPorNome,
  ) {}

  @Get(':name')
  async handle(@Param('name') name: string) {
    try {
      return await this.buscarMatriculaPorNome.execute({ name });
    } catch (error) {
      throw error;
    }
  }
}
