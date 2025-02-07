import {
  CriarPerguntas,
  CriarPerguntasRequest,
} from '@/services/criar-perguntas';
import {
  ResponderPerguntas,
  ResponderPerguntasRequest,
} from '@/services/responder-perguntas';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('formulario')
export class FormularioController {
  constructor(
    private readonly criarPerguntas: CriarPerguntas,
    private readonly responderPerguntas: ResponderPerguntas,
  ) {}

  @Post('pergunta')
  async criarPergunta(@Body() data: CriarPerguntasRequest) {
    try {
      await this.criarPerguntas.execute(data);
    } catch (error) {
      throw error;
    }
  }

  @Post('resposta')
  async responderPergunta(@Body() data: ResponderPerguntasRequest) {
    try {
      await this.responderPerguntas.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
