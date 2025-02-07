import { RepositoryAdmin } from '@/repositories/repository-admin';
import { RepositoryHash } from '@/repositories/repository-hash';

export type LoginAdminRequest = {
  username: string;
  password: string;
};

export class LoginAdmin {
  constructor(
    private readonly repositoryAdmin: RepositoryAdmin,
    private readonly repositoryHash: RepositoryHash,
  ) {}

  async execute({ username, password }: LoginAdminRequest) {
    const findUser = await this.repositoryAdmin.buscarUsuario(username);

    if (findUser === null) {
      throw new Error('Usuário invalido');
    }

    const comparePassword = await this.repositoryHash.compare(
      password,
      findUser.password,
    );

    if (comparePassword === false) {
      throw new Error('Usuário invalido');
    }

    return findUser;
  }
}
