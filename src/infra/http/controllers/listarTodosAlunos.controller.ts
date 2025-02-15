import { ListarTodosAlunos } from '@/services/listar-todos-alunos';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('alunos')
export class ListarTodosAlunosController {
  constructor(private readonly listarTodosAlunos: ListarTodosAlunos) {}

  @Get()
  async handle(@Query('page') page: string) {
    try {
      const alunos = await this.listarTodosAlunos.execute({ page: +page });

      return alunos;
    } catch (error) {
      throw error;
    }
  }
}
