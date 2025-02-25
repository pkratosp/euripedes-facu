import { DesmatricularAluno } from '@/services/desmatricular-aluno';
import { Controller, Delete, Param } from '@nestjs/common';

@Controller('/matriculas')
export class DesmatricularAlunoController {
  constructor(private readonly desmatricularAluno: DesmatricularAluno) {}

  @Delete(':idMatricula')
  async handle(@Param('idMatricula') idMatricula: string) {
    try {
      await this.desmatricularAluno.execute(idMatricula);
    } catch (error) {
      throw error;
    }
  }
}
