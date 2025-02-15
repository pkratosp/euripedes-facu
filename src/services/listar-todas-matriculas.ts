import { Injectable } from '@nestjs/common';
import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { ListarTodasMatriculasDto } from './dto/listar-todas-matriculas-dto';

@Injectable()
export class ListarTodasMatriculas {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute({ page }: ListarTodasMatriculasDto) {
    const matriculas = await this.repositoryMatricula.buscarTodasMatriculas({
      page,
    });

    return matriculas;
  }
}
