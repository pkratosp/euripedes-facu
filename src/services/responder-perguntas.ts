import { RepositoryFormulario } from '@/repositories/repository-formulario';
import { Injectable } from '@nestjs/common';
import { Respostas } from '@prisma/client';

export type ResponderPerguntasRequest = {
  resposta: string;
  perguntasId: string | null;
  matriculaId: string;
};

@Injectable()
export class ResponderPerguntas {
  constructor(private readonly repositoryFormualario: RepositoryFormulario) {}

  async execute(data: ResponderPerguntasRequest) {
    await this.repositoryFormualario.registarResposta(data);
  }
}
