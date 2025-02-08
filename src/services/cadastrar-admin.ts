import { RepositoryAdmin } from '@/repositories/repository-admin';
import { RepositoryHash } from '@/repositories/repository-hash';
import { CadastrarAdminRequestDto } from './dto/cadastrar-admin-dto';
import { Injectable } from '@nestjs/common';
import { UsuarioExiste } from './errors/usuario-existe-error';

@Injectable()
export class CadastrarAdmin {
  constructor(
    private readonly repositoryAdmin: RepositoryAdmin,
    private readonly repositoryHash: RepositoryHash,
  ) {}

  async execute({ nome, password, username }: CadastrarAdminRequestDto) {
    const findUser = await this.repositoryAdmin.buscarUsuario(username);

    if (findUser) {
      throw new UsuarioExiste();
    }

    const hashPassword = await this.repositoryHash.saltHash(password, 6);

    await this.repositoryAdmin.cadastrarUsuario({
      nome: nome,
      password: hashPassword.hash,
      username: username,
    });
  }
}
