import { BuscarDadosAluno } from '@/services/buscar-dados-aluno';
import { BuscarOcorrencias } from '@/services/buscar-ocorrencias';
import {
  CadastrarAluno,
  CadastrarAlunoRequest,
} from '@/services/cadastrar-aluno';
import { EditarAluno, EditarAlunoRequest } from '@/services/editar-aluno';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('aluno')
export class AlunoController {
  constructor(
    private readonly cadastrarAluno: CadastrarAluno,
    private readonly buscarDadosAluno: BuscarDadosAluno,
    private readonly editarAluno: EditarAluno,
  ) {}

  @Post()
  async criarAluno(@Body() data: CadastrarAlunoRequest) {
    try {
      await this.cadastrarAluno.execute(data);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async buscarAluno(@Param('id') id: string) {
    try {
      const aluno = await this.buscarDadosAluno.execute(id);

      return aluno;
    } catch (error) {
      throw error;
    }
  }

  @Put(':idAluno')
  async editarDadosAluno(
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
