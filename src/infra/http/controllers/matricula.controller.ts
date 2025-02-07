import {
  MatricularAluno,
  MatricularAlunoRequest,
} from '@/services/matricular-aluno';
import {
  RematricularAluno,
  RematricularAlunoRequest,
} from '@/services/rematricular-aluno';
import { Body, Controller, Post, Put } from '@nestjs/common';

@Controller('matriculas')
export class MatriculaController {
  constructor(
    private readonly matricularAluno: MatricularAluno,
    private readonly rematricularAluno: RematricularAluno,
  ) {}

  @Post()
  async matricular(@Body() data: MatricularAlunoRequest) {
    try {
    } catch (error) {
      throw error;
    }
  }

  @Put()
  async rematricular(@Body() data: RematricularAlunoRequest) {
    try {
      await this.rematricularAluno.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
