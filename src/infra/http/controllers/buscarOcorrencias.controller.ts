import { BuscarOcorrencias } from '@/services/buscar-ocorrencias';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('ocorrencias')
export class BuscarOcorrenciasController {
  constructor(private readonly buscarOcorrencias: BuscarOcorrencias) {}

  @Get(':idAluno')
  async hanlde(@Param('idAluno') idAluno: string) {
    try {
      const ocorrencia = await this.buscarOcorrencias.execute(idAluno);

      return ocorrencia;
    } catch (error) {
      throw error;
    }
  }
}
