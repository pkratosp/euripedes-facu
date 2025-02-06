import { InMemoryRepositoryMatricula } from 'tests/in-memory/in-memory-repository-matricula';
import { MatricularAluno } from './matricular-aluno';
import { CadastrarAluno } from './cadastrar-aluno';
import { InMemoryRepositoryAluno } from 'tests/in-memory/in-memory-repository-aluno';

let inMemoryRepositoryAluno: InMemoryRepositoryAluno;
let inMemoryRepositoryMatricula: InMemoryRepositoryMatricula;
let sut: MatricularAluno;
let cadastrarAluno: CadastrarAluno;

describe('matricular aluno', () => {
  beforeEach(() => {
    inMemoryRepositoryAluno = new InMemoryRepositoryAluno();
    inMemoryRepositoryMatricula = new InMemoryRepositoryMatricula();
    sut = new MatricularAluno(inMemoryRepositoryMatricula);
    cadastrarAluno = new CadastrarAluno(inMemoryRepositoryAluno);
  });

  it('deve cadastrar a matricula', async () => {
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

    await sut.execute({
      alunoId: inMemoryRepositoryAluno.alunos[0].id,
      anoMatricula: new Date().getFullYear(),
      atendido: '',
      responsavelLegal: 'mae',
      telefoneMae: '99999',
      telefonePai: '8888',
      telefoneRecado: '8888',
    });

    expect(inMemoryRepositoryMatricula.matriculas[0]).toEqual(
      expect.objectContaining({
        alunoId: inMemoryRepositoryAluno.alunos[0].id,
        anoMatricula: new Date().getFullYear(),
        atendido: '',
        responsavelLegal: 'mae',
        telefoneMae: '99999',
        telefonePai: '8888',
        telefoneRecado: '8888',
      }),
    );
  });
});
