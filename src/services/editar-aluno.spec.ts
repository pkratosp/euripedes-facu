import { InMemoryRepositoryAluno } from 'tests/in-memory/in-memory-repository-aluno';
import { EditarAluno } from './editar-aluno';
import { CadastrarAluno } from './cadastrar-aluno';

let inMemoryRepositoryAluno: InMemoryRepositoryAluno;
let sut: EditarAluno;
let cadastrarAluno: CadastrarAluno;

describe('editar aluno', () => {
  beforeEach(() => {
    inMemoryRepositoryAluno = new InMemoryRepositoryAluno();
    cadastrarAluno = new CadastrarAluno(inMemoryRepositoryAluno);
    sut = new EditarAluno(inMemoryRepositoryAluno);
  });

  it('deve cadastrar aluno', async () => {
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

    await sut.execute(
      {
        bairro: 'novo bairro',
        cep: '150099',
        contatos: '0000',
      },
      inMemoryRepositoryAluno.alunos[0].id,
    );

    expect(inMemoryRepositoryAluno.alunos[0]).toEqual(
      expect.objectContaining({
        bairro: 'novo bairro',
        cep: '150099',
        contatos: '0000',
      }),
    );
  });
});
