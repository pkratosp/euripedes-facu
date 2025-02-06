import { CriarPerguntasRequest } from '@/services/criar-perguntas';
import { ResponderPerguntasRequest } from '@/services/responder-perguntas';
import { Perguntas, Respostas } from '@prisma/client';

export abstract class RepositoryFormulario {
  abstract cadastrarPergunta(data: CriarPerguntasRequest): Promise<void>;
  abstract registarResposta(data: ResponderPerguntasRequest): Promise<void>;
  abstract buscarRepostasPorMatricula(
    idMatricula: string,
  ): Promise<Respostas[] | []>;
  abstract buscarPerguntas(): Promise<Perguntas[]>;
  abstract removerPergunta(idPergunta: string): Promise<void>;
  abstract removerResposta(idResposta: string): Promise<void>;
}
