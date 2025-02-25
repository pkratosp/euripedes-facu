import { RematricularAluno } from '@/services/rematricular-aluno';
import { Body, Controller, Param, Patch } from '@nestjs/common';

@Controller('/matriculas')
export class RematricularAlunoController {
  constructor(private readonly rematricularAluno: RematricularAluno) {}

  @Patch(':idMatricula')
  async handle(
    @Param('idMatricula') idMatricula: string,
    @Body() body: { anoMatricula: number },
  ) {
    try {
      await this.rematricularAluno.execute(idMatricula, body.anoMatricula);
    } catch (error) {
      throw error;
    }
  }
}
