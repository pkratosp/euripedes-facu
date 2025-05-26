import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';
import { BuscarMatriculaPorNomeDto } from './dto/buscar-matricula-por-nome-dto';

@Injectable()
export class BuscarMatriculaPorNome {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute({ name }: BuscarMatriculaPorNomeDto) {
    const { matriculas, total } =
      await this.repositoryMatricula.buscarMatriculaPorNome(name);

    return {
      matriculas,
      total,
    };
  }
}
