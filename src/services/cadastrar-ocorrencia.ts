import { RepositoryOcorrencia } from '@/repositories/repository-ocorrencia';
import { Injectable } from '@nestjs/common';
import { CadastrarOcorrenciaRequestDto } from './dto/cadastrar-ocorrencia-dto';

@Injectable()
export class CadastrarOcorrencia {
  constructor(private readonly repositoryOcorrencia: RepositoryOcorrencia) {}

  async execute(data: CadastrarOcorrenciaRequestDto) {
    await this.repositoryOcorrencia.registrarOcorrencia(data);
  }
}
