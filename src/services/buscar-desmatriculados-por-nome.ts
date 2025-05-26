import { Injectable } from '@nestjs/common';
import { BuscarDesmatriculadosPorNomeDto } from './dto/buscar-desmatriculados-por-nome-dto';
import { RepositoryMatricula } from '@/repositories/repository-matricula';

@Injectable()
export class BuscarDesmatriculadosPorNome {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute({ name }: BuscarDesmatriculadosPorNomeDto) {
    const { matriculas, total } =
      await this.repositoryMatricula.buscarDesmatriculadosPorNome(name);

    return {
      matriculas,
      total,
    };
  }
}
