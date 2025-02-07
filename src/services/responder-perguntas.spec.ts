import { InMemoryRepositoryFormulario } from 'tests/in-memory/in-memory-repository-formulario';
import { ResponderPerguntas } from './responder-perguntas';
import { CriarPerguntas } from './criar-perguntas';
import { InMemoryRepositoryMatricula } from 'tests/in-memory/in-memory-repository-matricula';
import { InMemoryRepositoryAluno } from 'tests/in-memory/in-memory-repository-aluno';
import { MatricularAluno } from './matricular-aluno';
import { CadastrarAluno } from './cadastrar-aluno';

let inMemoryRepositoryMatricula: InMemoryRepositoryMatricula;
let inMemoryRepositoryAluno: InMemoryRepositoryAluno;
let inMemoryRepositoryFormulario: InMemoryRepositoryFormulario;
let sut: ResponderPerguntas;
let criarPerguntas: CriarPerguntas;
let matricularAluno: MatricularAluno;
let cadastrarAluno: CadastrarAluno;

describe('Responder pergunta', () => {
  beforeEach(() => {
    inMemoryRepositoryFormulario = new InMemoryRepositoryFormulario();
    inMemoryRepositoryAluno = new InMemoryRepositoryAluno();
    inMemoryRepositoryMatricula = new InMemoryRepositoryMatricula();

    sut = new ResponderPerguntas(inMemoryRepositoryFormulario);
    criarPerguntas = new CriarPerguntas(inMemoryRepositoryFormulario);
    cadastrarAluno = new CadastrarAluno(inMemoryRepositoryAluno);
    matricularAluno = new MatricularAluno(inMemoryRepositoryMatricula);
  });

  it('deve responder a pergunta', async () => {
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

    await matricularAluno.execute({
      alunoId: inMemoryRepositoryAluno.alunos[0].id,
      anoMatricula: new Date().getFullYear(),
      atendido: '',
      responsavelLegal: 'mae',
      telefoneMae: '99999',
      telefonePai: '8888',
      telefoneRecado: '8888',
      documentos: [],
    });

    await criarPerguntas.execute({
      descricao: 'descricao pergunta',
      titulo: 'pergunta1',
    });

    const perguntaId = inMemoryRepositoryFormulario.perguntas[0].id;

    await sut.execute({
      perguntasId: perguntaId,
      resposta: 'respota da pergunta 1',
      matriculaId: inMemoryRepositoryMatricula.matriculas[0].id,
    });

    expect(inMemoryRepositoryFormulario.respostas.length).toBe(1);
  });
});
