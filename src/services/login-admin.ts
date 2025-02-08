import { RepositoryAdmin } from '@/repositories/repository-admin';
import { RepositoryHash } from '@/repositories/repository-hash';
import { LoginAdminRequestDto } from './dto/login-admin-dto';
import { Injectable } from '@nestjs/common';
import { RepositoryEncrypter } from '@/repositories/repository-encrypter';
import { UsuarioInvalidoError } from './errors/usuario-invalido-error';

@Injectable()
export class LoginAdmin {
  constructor(
    private readonly repositoryAdmin: RepositoryAdmin,
    private readonly repositoryHash: RepositoryHash,
    private readonly repositoryEncrypter: RepositoryEncrypter,
  ) {}

  async execute({ username, password }: LoginAdminRequestDto) {
    const findUser = await this.repositoryAdmin.buscarUsuario(username);

    if (findUser === null) {
      throw new UsuarioInvalidoError();
    }

    const comparePassword = await this.repositoryHash.compare(
      password,
      findUser.password,
    );

    if (comparePassword === false) {
      throw new UsuarioInvalidoError();
    }

    const { access_token } = await this.repositoryEncrypter.encrypt({
      sub: findUser.id,
    });

    return {
      ...findUser,
      access_token: access_token,
    };
  }
}
