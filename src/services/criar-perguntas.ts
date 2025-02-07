import { RepositoryFormulario } from '@/repositories/repository-formulario';
import { Injectable } from '@nestjs/common';

export type CriarPerguntasRequest = {
  titulo: string;
  descricao: string;
};

@Injectable()
export class CriarPerguntas {
  constructor(private readonly repositoryFormulario: RepositoryFormulario) {}

  async execute(data: CriarPerguntasRequest) {
    await this.repositoryFormulario.cadastrarPergunta(data);
  }
}
