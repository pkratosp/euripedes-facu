import { BuscarOcorrencias } from '@/services/buscar-ocorrencias';
import {
  CadastrarOcorrencia,
  CadastrarOcorrenciaRequest,
} from '@/services/cadastrar-ocorrencia';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('ocorrencias')
export class OcorrenciaController {
  constructor(
    private readonly buscarOcorrencias: BuscarOcorrencias,
    private readonly cadastrarOcorrencias: CadastrarOcorrencia,
  ) {}

  @Get(':idAluno')
  async buscarOcorrencia(@Param('idAluno') idAluno: string) {
    try {
      const ocorrencia = await this.buscarOcorrencias.execute(idAluno);

      return ocorrencia;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async registrarOcorrencia(@Body() data: CadastrarOcorrenciaRequest) {
    try {
      await this.cadastrarOcorrencias.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
