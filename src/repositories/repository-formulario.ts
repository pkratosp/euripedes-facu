import { CriarPerguntasRequestDto } from '@/services/dto/criar-perguntas-dto';
import { ResponderPerguntasRequestDto } from '@/services/dto/responder-perguntas-dto';
import { Perguntas, Respostas } from '@prisma/client';

export abstract class RepositoryFormulario {
  abstract cadastrarPergunta(data: CriarPerguntasRequestDto): Promise<void>;
  abstract registarResposta(data: ResponderPerguntasRequestDto): Promise<void>;
  abstract buscarRepostasPorMatricula(
    idMatricula: string,
  ): Promise<Respostas[] | []>;
  abstract buscarPerguntas(): Promise<Perguntas[]>;
  abstract removerPergunta(idPergunta: string): Promise<void>;
  abstract removerResposta(idResposta: string): Promise<void>;
}
