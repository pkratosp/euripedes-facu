import { RepositoryFormulario } from '@/repositories/repository-formulario';
import { CriarPerguntasRequestDto } from '@/services/dto/criar-perguntas-dto';
import { ResponderPerguntasRequestDto } from '@/services/dto/responder-perguntas-dto';
import { Respostas, Perguntas } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryRepositoryFormulario implements RepositoryFormulario {
  public perguntas: Perguntas[] = [];
  public respostas: Respostas[] = [];

  async cadastrarPergunta(data: CriarPerguntasRequestDto): Promise<void> {
    this.perguntas.push({
      ...data,
      id: randomUUID(),
    });
  }

  async registarResposta(data: ResponderPerguntasRequestDto): Promise<void> {
    this.respostas.push({
      id: randomUUID(),
      matriculasId: data.matriculaId,
      perguntasId: data.perguntasId,
      resposta: data.resposta,
    });
  }

  async buscarRepostasPorMatricula(
    idMatricula: string,
  ): Promise<Respostas[] | []> {
    const respostas = this.respostas.filter(
      (resposta) => resposta.matriculasId === idMatricula,
    );

    return respostas;
  }

  async buscarPerguntas(): Promise<Perguntas[]> {
    return this.perguntas;
  }

  async removerPergunta(idPergunta: string): Promise<void> {
    const perguntas = this.perguntas.filter(
      (pergunta) => pergunta.id !== idPergunta,
    );

    this.perguntas = perguntas;
  }

  async removerResposta(idResposta: string): Promise<void> {
    const respostas = this.respostas.filter(
      (resopsta) => resopsta.id !== idResposta,
    );

    this.respostas = respostas;
  }
}
