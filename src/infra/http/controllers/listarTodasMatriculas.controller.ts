import { ListarTodasMatriculas } from '@/services/listar-todas-matriculas';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('/matriculas')
export class ListarTodasMatriculasController {
  constructor(private readonly listarTodasMatriculas: ListarTodasMatriculas) {}

  @Get()
  async handle(@Query('page') page: string) {
    try {
      const matriculas = await this.listarTodasMatriculas.execute({
        page: +page,
      });

      return matriculas;
    } catch (error) {
      throw error;
    }
  }
}
