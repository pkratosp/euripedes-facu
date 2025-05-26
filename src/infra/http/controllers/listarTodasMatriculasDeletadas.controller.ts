import { ListarTodasMatriculasDeletadas } from '@/services/listar-todas-matriculas-deletadas';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('/desmatriculados')
export class ListarTodasMatriculasDeletadasController {
  constructor(
    private readonly listarTodasMatriculasDeletadas: ListarTodasMatriculasDeletadas,
  ) {}

  @Get()
  async handle(@Query('page') page: string) {
    try {
      const desmatriculados = await this.listarTodasMatriculasDeletadas.execute(
        {
          page: +page,
        },
      );

      return desmatriculados;
    } catch (error) {
      throw error;
    }
  }
}
