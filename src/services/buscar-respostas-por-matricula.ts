import { RepositoryFormulario } from '@/repositories/repository-formulario';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BuscarRespostasPorMatricula {
  constructor(private readonly repositoryFormulario: RepositoryFormulario) {}

  async execute(idMatricula: string) {
    return await this.repositoryFormulario.buscarRepostasPorMatricula(
      idMatricula,
    );
  }
}
