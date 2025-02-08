import { CadastrarAdminRequestDto } from '@/services/dto/cadastrar-admin-dto';
import { User } from '@prisma/client';

export abstract class RepositoryAdmin {
  abstract buscarUsuario(username: string): Promise<User | null>;
  abstract cadastrarUsuario(data: CadastrarAdminRequestDto): Promise<void>;
}
