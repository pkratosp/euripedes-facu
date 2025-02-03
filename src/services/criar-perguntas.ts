import { RepositoryFormulario } from '@/repositories/repository-formulario';
import { Injectable } from '@nestjs/common';
import { Perguntas } from '@prisma/client';

interface CriarPerguntasRequest extends Perguntas {}

@Injectable()
export class CriarPerguntas {
  constructor(private readonly repositoryFormulario: RepositoryFormulario) {}

  async execute(data: CriarPerguntasRequest) {
    await this.repositoryFormulario.cadastrarPergunta(data);
  }
}
