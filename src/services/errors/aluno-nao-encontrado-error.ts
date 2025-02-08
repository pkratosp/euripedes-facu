export class AlunoNaoEncontradoError extends Error {
  constructor() {
    super('Aluno nao encontrado');
  }
}
