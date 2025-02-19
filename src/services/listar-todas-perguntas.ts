import { RepositoryFormulario } from '@/repositories/repository-formulario';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListarTodasPerguntas {
  constructor(private readonly repositoryFormulario: RepositoryFormulario) {}

  async execute() {
    const perguntas = await this.repositoryFormulario.buscarPerguntas();

    return perguntas;
  }
}
