import { RepositoryFormulario } from '@/repositories/repository-formulario';
import { Injectable } from '@nestjs/common';
import { ResponderPerguntasRequestDto } from './dto/responder-perguntas-dto';

@Injectable()
export class ResponderPerguntas {
  constructor(private readonly repositoryFormualario: RepositoryFormulario) {}

  async execute(data: ResponderPerguntasRequestDto) {
    await this.repositoryFormualario.registarResposta(data);
  }
}
