import { CriarPerguntas } from '@/services/criar-perguntas';
import { CriarPerguntasRequestDto } from '@/services/dto/criar-perguntas-dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('formulario')
export class CriarPerguntasController {
  constructor(private readonly criarPerguntas: CriarPerguntas) {}

  @Post('pergunta')
  async handle(@Body() data: CriarPerguntasRequestDto) {
    try {
      await this.criarPerguntas.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
