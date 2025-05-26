import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';
import { ListarTodasMatriculasDeletadasDto } from './dto/listar-todas-matriculas-deletadas-dto';

@Injectable()
export class ListarTodasMatriculasDeletadas {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute({ page }: ListarTodasMatriculasDeletadasDto) {
    const matriculas =
      await this.repositoryMatricula.buscarTodasMatriculasDeletadas({
        page,
      });

    return matriculas;
  }
}
