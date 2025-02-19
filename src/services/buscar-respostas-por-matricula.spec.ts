import { InMemoryRepositoryAluno } from 'tests/in-memory/in-memory-repository-aluno';
import { InMemoryRepositoryFormulario } from 'tests/in-memory/in-memory-repository-formulario';
import { InMemoryRepositoryMatricula } from 'tests/in-memory/in-memory-repository-matricula';
import { MatricularAluno } from './matricular-aluno';
import { CadastrarAluno } from './cadastrar-aluno';
import { BuscarRespostasPorMatricula } from './buscar-respostas-por-matricula';
import { CriarPerguntas } from './criar-perguntas';
import { ResponderPerguntas } from './responder-perguntas';

let inMemoryRepositoryFormulario: InMemoryRepositoryFormulario;
let inMemoryRepositoryMatricula: InMemoryRepositoryMatricula;
let inMemoryRepositoryAluno: InMemoryRepositoryAluno;
let matricularAluno: MatricularAluno;
let cadastrarAluno: CadastrarAluno;
let criarPergunta: CriarPerguntas;
let responderPerguntas: ResponderPerguntas;
let sut: BuscarRespostasPorMatricula;

describe('Buscar respostas por matricula', () => {
  beforeEach(() => {
    inMemoryRepositoryAluno = new InMemoryRepositoryAluno();
    inMemoryRepositoryFormulario = new InMemoryRepositoryFormulario();
    inMemoryRepositoryMatricula = new InMemoryRepositoryMatricula();
    matricularAluno = new MatricularAluno(inMemoryRepositoryMatricula);
    cadastrarAluno = new CadastrarAluno(inMemoryRepositoryAluno);
    criarPergunta = new CriarPerguntas(inMemoryRepositoryFormulario);
    responderPerguntas = new ResponderPerguntas(inMemoryRepositoryFormulario);
    sut = new BuscarRespostasPorMatricula(inMemoryRepositoryFormulario);
  });

  it('deve buscar todas as respostas de uma matricula', async () => {
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

    await criarPergunta.execute({
      descricao: 'descrição da pergunta',
      titulo: 'pergunta',
    });

    const perguntaId = inMemoryRepositoryFormulario.perguntas[0].id;
    const matriculaId = inMemoryRepositoryMatricula.matriculas[0].id;

    await responderPerguntas.execute({
      matriculaId: matriculaId,
      perguntasId: perguntaId,
      resposta: 'resposta pergunta 1',
    });

    const respostas = await sut.execute(matriculaId);
    expect(respostas).toHaveLength(1);
    expect(respostas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          resposta: expect.any(String),
          perguntasId: expect.any(String),
          matriculasId: expect.any(String),
        }),
      ]),
    );
  });
});
