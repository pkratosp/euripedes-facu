import { InMemoryRepositoryOcorrencia } from 'tests/in-memory/in-memory-repository-ocorrencia';
import { CadastrarOcorrencia } from './cadastrar-ocorrencia';
import { CadastrarAluno } from './cadastrar-aluno';
import { InMemoryRepositoryAluno } from 'tests/in-memory/in-memory-repository-aluno';

let inMemoryRepositoryAluno: InMemoryRepositoryAluno;
let inMemoryRepositoryOcorrencia: InMemoryRepositoryOcorrencia;
let sut: CadastrarOcorrencia;
let cadastrarAluno: CadastrarAluno;

describe('Cadastrar ocorrencia', () => {
  beforeEach(() => {
    inMemoryRepositoryAluno = new InMemoryRepositoryAluno();
    inMemoryRepositoryOcorrencia = new InMemoryRepositoryOcorrencia();
    sut = new CadastrarOcorrencia(inMemoryRepositoryOcorrencia);
    cadastrarAluno = new CadastrarAluno(inMemoryRepositoryAluno);
  });

  it('deve cadastrar uma ocorrencia', async () => {
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

    const dataOcorrencia = new Date();

    await sut.execute({
      alunoId: inMemoryRepositoryAluno.alunos[0].id,
      dataOcorrencia,
      descricao: 'descrição do ocorrido',
      titulo: 'ocorencia',
    });

    expect(inMemoryRepositoryOcorrencia.ocorrencias).toHaveLength(1);
    expect(inMemoryRepositoryOcorrencia.ocorrencias).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          alunoId: inMemoryRepositoryAluno.alunos[0].id,
          dataOcorrencia,
          descricao: 'descrição do ocorrido',
          titulo: 'ocorencia',
        }),
      ]),
    );
  });
});
