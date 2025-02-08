export class AlunoExisteError extends Error {
  constructor() {
    super('Aluno já foi cadastrado');
  }
}
