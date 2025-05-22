import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';

type BuscarMatriculaPorNomeType = {
  name: string;
};

@Injectable()
export class BuscarMatriculaPorNome {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute({ name }: BuscarMatriculaPorNomeType) {
    const { matriculas, total } =
      await this.repositoryMatricula.buscarMatriculaPorNome(name);

    return {
      matriculas,
      total,
    };
  }
}
