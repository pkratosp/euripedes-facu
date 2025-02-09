import { CadastrarOcorrencia } from '@/services/cadastrar-ocorrencia';
import { CadastrarOcorrenciaRequestDto } from '@/services/dto/cadastrar-ocorrencia-dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('ocorrencias')
export class CadastrarOcorrenciasController {
  constructor(private readonly cadastrarOcorrencias: CadastrarOcorrencia) {}

  @Post()
  async handle(@Body() data: CadastrarOcorrenciaRequestDto) {
    try {
      await this.cadastrarOcorrencias.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
