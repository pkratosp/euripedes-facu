import { RepositoryFormulario } from '@/repositories/repository-formulario';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BuscarPerguntas {
  constructor(private readonly repositoryFormulario: RepositoryFormulario) {}

  async execute() {
    return await this.repositoryFormulario.buscarPerguntas();
  }
}
