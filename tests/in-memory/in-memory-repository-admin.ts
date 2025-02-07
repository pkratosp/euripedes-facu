import { RepositoryAdmin } from '@/repositories/repository-admin';
import { CadastrarAdminRequest } from '@/services/cadastrar-admin';
import { User } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryRepositoryAdmin implements RepositoryAdmin {
  public usuarios: User[] = [];

  async buscarUsuario(username: string): Promise<User | null> {
    const findUser = this.usuarios.find(
      (usuario) => usuario.username === username,
    );

    if (findUser) {
      return findUser;
    }

    return null;
  }

  async cadastrarUsuario(data: CadastrarAdminRequest): Promise<void> {
    this.usuarios.push({
      ...data,
      id: randomUUID(),
    });
  }
}
