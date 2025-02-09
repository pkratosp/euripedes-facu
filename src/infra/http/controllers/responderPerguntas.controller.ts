import { ResponderPerguntasRequestDto } from '@/services/dto/responder-perguntas-dto';
import { ResponderPerguntas } from '@/services/responder-perguntas';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('formulario')
export class ResponderPerguntasController {
  constructor(private readonly responderPerguntas: ResponderPerguntas) {}

  @Post('resposta')
  async handle(@Body() data: ResponderPerguntasRequestDto) {
    try {
      await this.responderPerguntas.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
