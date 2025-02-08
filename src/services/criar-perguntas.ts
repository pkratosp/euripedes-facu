import { RepositoryFormulario } from '@/repositories/repository-formulario';
import { Injectable } from '@nestjs/common';
import { CriarPerguntasRequestDto } from './dto/criar-perguntas-dto';

@Injectable()
export class CriarPerguntas {
  constructor(private readonly repositoryFormulario: RepositoryFormulario) {}

  async execute(data: CriarPerguntasRequestDto) {
    await this.repositoryFormulario.cadastrarPergunta(data);
  }
}
