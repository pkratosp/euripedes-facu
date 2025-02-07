import { CadastrarAdminRequest } from '@/services/cadastrar-admin';
import { User } from '@prisma/client';

export abstract class RepositoryAdmin {
  abstract buscarUsuario(username: string): Promise<User | null>;
  abstract cadastrarUsuario(data: CadastrarAdminRequest): Promise<void>;
}
