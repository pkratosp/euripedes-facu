import { Perguntas, Respostas } from '@prisma/client';

export abstract class RepositoryFormulario {
  abstract cadastrarPergunta(data: Perguntas): Promise<void>;
  abstract registarResposta(data: Respostas): Promise<void>;
  abstract buscarRepostasPorMatricula(
    idMatricula: string,
  ): Promise<Respostas[] | []>;
  abstract buscarPerguntas(): Promise<Perguntas[]>;
  abstract removerPergunta(idPergunta: string): Promise<void>;
  abstract removerResposta(idResposta: string): Promise<void>;
}
