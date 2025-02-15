import { InMemoryRepositoryAluno } from 'tests/in-memory/in-memory-repository-aluno';
import { ListarTodosAlunos } from './listar-todos-alunos';
import { CadastrarAluno } from './cadastrar-aluno';
import { randomUUID } from 'node:crypto';
import { ListaAlunosNomes } from './lista-alunos-nomes';

let inMemoryRepositoryAluno: InMemoryRepositoryAluno;
let cadastrarAluno: CadastrarAluno;
let sut: ListaAlunosNomes;

describe('Listar todos alunos somente nome', () => {
  beforeEach(() => {
    inMemoryRepositoryAluno = new InMemoryRepositoryAluno();
    cadastrarAluno = new CadastrarAluno(inMemoryRepositoryAluno);
    sut = new ListaAlunosNomes(inMemoryRepositoryAluno);
  });

  it('Deve listar todos os alunos', async () => {
    await cadastrarAluno.execute({
      bairro: 'bairro teste',
      cep: '150090',
      contatos: '99999',
      cpf: '99999',
      cpfResponsavel: '8888',
      dataNascimento: '25/12/2000',
      endereco: 'rua jhon doe',
      escola: 'escola',
      estado: 'sp',
      filiacaoMae: 'nome da mae',
      naturalidade: 'brasileiro',
      nis: '999',
      nome: 'jhon doe',
      pai: 'nome do pai',
      ra: '1111',
      responsavel: 'responsavel',
      rg: '22222',
      rgResponsavel: '33333',
      serieEscola: '5 ano',
      sexo: 'masculino',
      ultimaProcedencia: '',
      documentos: [],
    });

    const alunos = await sut.execute();

    expect(alunos.alunos).toHaveLength(1);
    expect(alunos.alunos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          nome: expect.any(String),
        }),
      ]),
    );
  });
});
