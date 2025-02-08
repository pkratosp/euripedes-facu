import { RepositoryAdmin } from '@/repositories/repository-admin';
import { CadastrarAdminRequestDto } from '@/services/dto/cadastrar-admin-dto';
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

  async cadastrarUsuario(data: CadastrarAdminRequestDto): Promise<void> {
    this.usuarios.push({
      ...data,
      id: randomUUID(),
    });
  }
}
