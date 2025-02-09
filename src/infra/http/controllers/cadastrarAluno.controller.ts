import { CadastrarAluno } from '@/services/cadastrar-aluno';
import { CadastrarAlunoRequestDto } from '@/services/dto/cadastrar-aluno-dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('aluno')
export class CadastrarAlunoController {
  constructor(private readonly cadastrarAluno: CadastrarAluno) {}

  @Post()
  async handle(@Body() data: CadastrarAlunoRequestDto) {
    try {
      await this.cadastrarAluno.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
