import { RepositoryAdmin } from '@/repositories/repository-admin';
import { RepositoryHash } from '@/repositories/repository-hash';

export type CadastrarAdminRequest = {
  nome: string;
  username: string;
  password: string;
};

export class CadastrarAdmin {
  constructor(
    private readonly repositoryAdmin: RepositoryAdmin,
    private readonly repositoryHash: RepositoryHash,
  ) {}

  async execute({ nome, password, username }: CadastrarAdminRequest) {
    const findUser = await this.repositoryAdmin.buscarUsuario(username);

    if (findUser) {
      throw new Error('Usuário já existe');
    }

    const hashPassword = await this.repositoryHash.saltHash(password, 6);

    await this.repositoryAdmin.cadastrarUsuario({
      nome: nome,
      password: hashPassword.hash,
      username: username,
    });
  }
}
