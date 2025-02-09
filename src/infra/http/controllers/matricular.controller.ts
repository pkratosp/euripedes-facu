import { MatricularAlunoRequestDto } from '@/services/dto/matricular-aluno-dto';
import { MatricularAluno } from '@/services/matricular-aluno';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('matriculas')
export class MatriculaController {
  constructor(private readonly matricularAluno: MatricularAluno) {}

  @Post()
  async handle(@Body() data: MatricularAlunoRequestDto) {
    try {
      await this.matricularAluno.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
