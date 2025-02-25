import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';
import { EditarDadosMatriculaDto } from './dto/editar-dados-matricula-dto';

@Injectable()
export class EditarDadosMatricula {
  constructor(private readonly repositoryMatricula: RepositoryMatricula) {}

  async execute(idMatricula: string, data: Partial<EditarDadosMatriculaDto>) {
    await this.repositoryMatricula.editarMatricula(idMatricula, data);
  }
}
