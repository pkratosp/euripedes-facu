import { BuscarNomeAluno } from '@/services/buscar-nome-aluno';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('/alunos')
export class BuscarNomeAlunoController {
  constructor(private readonly buscarNomeAluno: BuscarNomeAluno) {}

  @Get(':name')
  async handle(@Param('name') name: string) {
    try {
      return await this.buscarNomeAluno.execute({ name });
    } catch (error) {
      throw error;
    }
  }
}
