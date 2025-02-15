import { ListaAlunosNomes } from '@/services/lista-alunos-nomes';
import { Controller, Get } from '@nestjs/common';

@Controller('/alunos/nomes')
export class ListaAlunosNomesController {
  constructor(private readonly listaAlunosNomes: ListaAlunosNomes) {}

  @Get()
  async handle() {
    try {
      const { alunos } = await this.listaAlunosNomes.execute();

      return {
        alunos,
      };
    } catch (error) {
      throw error;
    }
  }
}
