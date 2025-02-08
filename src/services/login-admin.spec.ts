import { InMemoryRepositoryAdmin } from 'tests/in-memory/in-memory-repository-admin';
import { LoginAdmin } from './login-admin';
import { RepositoryCryptography } from '@/infra/cryptography/repository-cryptography';
import { CadastrarAdmin } from './cadastrar-admin';
import { FakeEncrypter } from 'tests/factory/fakerJwt';

let inMemoryRepositoryAdmin: InMemoryRepositoryAdmin;
let repositoryCryptography: RepositoryCryptography;
let cadastrarUsuario: CadastrarAdmin;
let fakeEncrypter: FakeEncrypter;
let sut: LoginAdmin;

describe('login admin', () => {
  beforeEach(() => {
    inMemoryRepositoryAdmin = new InMemoryRepositoryAdmin();
    repositoryCryptography = new RepositoryCryptography();
    fakeEncrypter = new FakeEncrypter();
    sut = new LoginAdmin(
      inMemoryRepositoryAdmin,
      repositoryCryptography,
      fakeEncrypter,
    );
    cadastrarUsuario = new CadastrarAdmin(
      inMemoryRepositoryAdmin,
      repositoryCryptography,
    );
  });

  it('deve ser possivel logar com um usuario admin', async () => {
    const senha = '123456';
    await cadastrarUsuario.execute({
      nome: 'jhon doe',
      password: senha,
      username: 'jhondoeUser',
    });

    const user = await sut.execute({
      password: senha,
      username: 'jhondoeUser',
    });

    expect(user.id).toBeDefined();
  });
});
