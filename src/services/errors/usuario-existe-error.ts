export class UsuarioExiste extends Error {
  constructor() {
    super('Usuário já existe');
  }
}
