import { ListarTodasPerguntas } from '@/services/listar-todas-perguntas';
import { Controller, Get } from '@nestjs/common';

@Controller('/perguntas')
export class ListarTodasPerguntasController {
  constructor(private readonly listarTodasPerguntas: ListarTodasPerguntas) {}

  @Get()
  async handle() {
    try {
      const perguntas = await this.listarTodasPerguntas.execute();

      return {
        perguntas,
      };
    } catch (error) {
      throw error;
    }
  }
}
