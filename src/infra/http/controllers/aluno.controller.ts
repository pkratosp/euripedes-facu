import {
  CadastrarAluno,
  CadastrarAlunoRequest,
} from '@/services/cadastrar-aluno';
import { Body, Controller } from '@nestjs/common';

@Controller()
export class AlunoController {
  constructor(private readonly cadastrarAluno: CadastrarAluno) {}

  async criarAluno(@Body() data: CadastrarAlunoRequest) {
    try {
      await this.cadastrarAluno.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
