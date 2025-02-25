import { EditarDadosMatriculaDto } from '@/services/dto/editar-dados-matricula-dto';
import { EditarDadosMatricula } from '@/services/editar-dados-matricula';
import { Body, Controller, Param, Put } from '@nestjs/common';

@Controller('/matriculas')
export class EditarDadosMatriculaController {
  constructor(private readonly editarDadosMatricula: EditarDadosMatricula) {}

  @Put(':idMatricula')
  async handle(
    @Param('idMatricula') idMatricula: string,
    @Body() body: EditarDadosMatriculaDto,
  ) {
    try {
      await this.editarDadosMatricula.execute(idMatricula, body);
    } catch (error) {
      throw error;
    }
  }
}
