import { RepositoryFormulario } from '@/repositories/repository-formulario';
import { Injectable } from '@nestjs/common';
import { Respostas } from '@prisma/client';

interface ResponderPerguntasRequest extends Respostas {}

@Injectable()
export class ResponderPerguntas {
  constructor(private readonly repositoryFormualario: RepositoryFormulario) {}

  async execute(data: ResponderPerguntasRequest) {
    await this.repositoryFormualario.registarResposta(data);
  }
}
