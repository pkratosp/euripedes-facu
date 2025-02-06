import { RepositoryFormulario } from '@/repositories/repository-formulario';
import { CriarPerguntasRequest } from '@/services/criar-perguntas';
import { ResponderPerguntasRequest } from '@/services/responder-perguntas';
import { Respostas, Perguntas } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryRepositoryFormulario implements RepositoryFormulario {
  public perguntas: Perguntas[] = [];
  public respostas: Respostas[] = [];

  async cadastrarPergunta(data: CriarPerguntasRequest): Promise<void> {
    this.perguntas.push({
      ...data,
      id: randomUUID(),
    });
  }

  async registarResposta(data: ResponderPerguntasRequest): Promise<void> {
    this.respostas.push({
      ...data,
      id: randomUUID(),
    });
  }

  async buscarRepostasPorMatricula(
    idMatricula: string,
  ): Promise<Respostas[] | []> {
    const pergunta = this.perguntas.find(
      (pergunta) => pergunta.matriculaId === idMatricula,
    );

    const respostas = this.respostas.filter(
      (resposta) => resposta.perguntasId === pergunta?.id,
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
