import { InMemoryRepositoryAdmin } from 'tests/in-memory/in-memory-repository-admin';
import { CadastrarAdmin } from './cadastrar-admin';
import { RepositoryCryptography } from '@/infra/cryptography/repository-cryptography';

let inMemoryRepositoryAdmin: InMemoryRepositoryAdmin;
let repositoryCryptography: RepositoryCryptography;
let sut: CadastrarAdmin;

describe('cadastrar admin', () => {
  beforeEach(() => {
    inMemoryRepositoryAdmin = new InMemoryRepositoryAdmin();
    repositoryCryptography = new RepositoryCryptography();
    sut = new CadastrarAdmin(inMemoryRepositoryAdmin, repositoryCryptography);
  });

  it('deve ser possivel cadastrar o usuario', async () => {
    await sut.execute({
      nome: 'jhon doe',
      password: '123456',
      username: 'jhondoe1234',
    });

    expect(inMemoryRepositoryAdmin.usuarios).toHaveLength(1);
  });

  it('deve conter um hash na senha do usuario', async () => {
    const senha = '123456';
    await sut.execute({
      nome: 'jhon doe',
      password: senha,
      username: 'jhondoe1234',
    });

    const compareHash = await repositoryCryptography.compare(
      senha,
      inMemoryRepositoryAdmin.usuarios[0].password,
    );

    expect(compareHash).toBe(true);
  });
});
