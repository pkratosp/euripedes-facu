import { BuscarDesmatriculadosPorNome } from '@/services/buscar-desmatriculados-por-nome';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('/desmatriculados')
export class BuscarDesmatriculadosPorNomeController {
  constructor(
    private readonly buscarDesmatriculadosPorNome: BuscarDesmatriculadosPorNome,
  ) {}

  @Get(':name')
  async handle(@Param('name') name: string) {
    try {
      const desmatriculados = await this.buscarDesmatriculadosPorNome.execute({
        name,
      });

      return desmatriculados;
    } catch (error) {
      throw error;
    }
  }
}
