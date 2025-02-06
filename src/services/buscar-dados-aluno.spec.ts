import { InMemoryRepositoryAluno } from 'tests/in-memory/in-memory-repository-aluno';
import { CadastrarAluno } from './cadastrar-aluno';
import { BuscarDadosAluno } from './buscar-dados-aluno';

let inMemoryRepositoryAluno: InMemoryRepositoryAluno;
let cadastrarAluno: CadastrarAluno;
let sut: BuscarDadosAluno;

describe('buscar dados de aluno', () => {
  beforeEach(() => {
    inMemoryRepositoryAluno = new InMemoryRepositoryAluno();
    cadastrarAluno = new CadastrarAluno(inMemoryRepositoryAluno);
    sut = new BuscarDadosAluno(inMemoryRepositoryAluno);
  });

  it('deve buscar dados do aluno', async () => {
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
    });

    const buscarAluno = await sut.execute(inMemoryRepositoryAluno.alunos[0].id);

    expect(buscarAluno.id).toEqual(inMemoryRepositoryAluno.alunos[0].id);
  });
});
