import { CriarPerguntas } from '@/services/criar-perguntas';
import { CriarPerguntasRequestDto } from '@/services/dto/criar-perguntas-dto';
import { ResponderPerguntasRequestDto } from '@/services/dto/responder-perguntas-dto';
import { ResponderPerguntas } from '@/services/responder-perguntas';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('formulario')
export class FormularioController {
  constructor(
    private readonly criarPerguntas: CriarPerguntas,
    private readonly responderPerguntas: ResponderPerguntas,
  ) {}

  @Post('pergunta')
  async criarPergunta(@Body() data: CriarPerguntasRequestDto) {
    try {
      await this.criarPerguntas.execute(data);
    } catch (error) {
      throw error;
    }
  }

  @Post('resposta')
  async responderPergunta(@Body() data: ResponderPerguntasRequestDto) {
    try {
      await this.responderPerguntas.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
