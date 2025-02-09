import {
  RematricularAluno,
  RematricularAlunoRequest,
} from '@/services/rematricular-aluno';
import { Body, Controller, Put } from '@nestjs/common';

@Controller('matriculas')
export class RematricularAlunoController {
  constructor(private readonly rematricularAluno: RematricularAluno) {}

  @Put()
  async handle(@Body() data: RematricularAlunoRequest) {
    try {
      await this.rematricularAluno.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
