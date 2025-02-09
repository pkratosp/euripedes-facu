import { BuscarDadosAluno } from '@/services/buscar-dados-aluno';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('aluno')
export class BuscarDadosAlunoController {
  constructor(private readonly buscarDadosAluno: BuscarDadosAluno) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    try {
      const aluno = await this.buscarDadosAluno.execute(id);

      return aluno;
    } catch (error) {
      throw error;
    }
  }
}
