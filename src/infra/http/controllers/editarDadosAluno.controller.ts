import { EditarAluno, EditarAlunoRequest } from '@/services/editar-aluno';
import { Body, Controller, Param, Put } from '@nestjs/common';

@Controller('aluno')
export class EditarAlunoController {
  constructor(private readonly editarAluno: EditarAluno) {}

  @Put(':idAluno')
  async handle(
    @Body() data: EditarAlunoRequest,
    @Param('idAluno') idAluno: string,
  ) {
    try {
      await this.editarAluno.execute(data, idAluno);
    } catch (error) {
      throw error;
    }
  }
}
