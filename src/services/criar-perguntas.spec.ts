import { InMemoryRepositoryFormulario } from 'tests/in-memory/in-memory-repository-formulario';
import { CriarPerguntas } from './criar-perguntas';
import { InMemoryRepositoryMatricula } from 'tests/in-memory/in-memory-repository-matricula';
import { MatricularAluno } from './matricular-aluno';
import { CadastrarAluno } from './cadastrar-aluno';
import { InMemoryRepositoryAluno } from 'tests/in-memory/in-memory-repository-aluno';

let inMemoryRepositoryAluno: InMemoryRepositoryAluno;
let inMemoryRepositoryMatricula: InMemoryRepositoryMatricula;
let inMemoryRepositoryFormulario: InMemoryRepositoryFormulario;
let sut: CriarPerguntas;
let matricularAluno: MatricularAluno;
let cadastrarAluno: CadastrarAluno;

describe('Criar perguntas', () => {
  beforeEach(() => {
    inMemoryRepositoryAluno = new InMemoryRepositoryAluno();
    inMemoryRepositoryMatricula = new InMemoryRepositoryMatricula();
    inMemoryRepositoryFormulario = new InMemoryRepositoryFormulario();
    sut = new CriarPerguntas(inMemoryRepositoryFormulario);
    matricularAluno = new MatricularAluno(inMemoryRepositoryMatricula);
    cadastrarAluno = new CadastrarAluno(inMemoryRepositoryAluno);
  });

  it('deve ser possivel criar uma pergunta', async () => {
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

    await matricularAluno.execute({
      alunoId: inMemoryRepositoryAluno.alunos[0].id,
      anoMatricula: new Date().getFullYear(),
      atendido: '',
      responsavelLegal: 'mae',
      telefoneMae: '99999',
      telefonePai: '8888',
      telefoneRecado: '8888',
    });

    await sut.execute({
      descricao: 'descrição da pergunta',
      matriculaId: inMemoryRepositoryMatricula.matriculas[0].id,
      titulo: 'pergunta',
    });

    expect(inMemoryRepositoryFormulario.perguntas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          descricao: 'descrição da pergunta',
          matriculaId: inMemoryRepositoryMatricula.matriculas[0].id,
          titulo: 'pergunta',
        }),
      ]),
    );
  });
});
