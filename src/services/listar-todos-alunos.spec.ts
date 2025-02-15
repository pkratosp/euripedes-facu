import { InMemoryRepositoryAluno } from 'tests/in-memory/in-memory-repository-aluno';
import { ListarTodosAlunos } from './listar-todos-alunos';
import { CadastrarAluno } from './cadastrar-aluno';
import { randomUUID } from 'node:crypto';

let inMemoryRepositoryAluno: InMemoryRepositoryAluno;
let cadastrarAluno: CadastrarAluno;
let sut: ListarTodosAlunos;

describe('Listar todos alunos', () => {
  beforeEach(() => {
    inMemoryRepositoryAluno = new InMemoryRepositoryAluno();
    cadastrarAluno = new CadastrarAluno(inMemoryRepositoryAluno);
    sut = new ListarTodosAlunos(inMemoryRepositoryAluno);
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

    const alunos = await sut.execute({ page: 1 });

    expect(alunos.alunos).toHaveLength(1);
  });

  it('Deve listar todos os alunos por pagina', async () => {
    let init = 0;
    while (init < 22) {
      await cadastrarAluno.execute({
        bairro: 'bairro teste',
        cep: '150090',
        contatos: '99999',
        cpf: randomUUID(),
        cpfResponsavel: randomUUID(),
        dataNascimento: '25/12/2000',
        endereco: 'rua jhon doe',
        escola: 'escola',
        estado: 'sp',
        filiacaoMae: 'nome da mae',
        naturalidade: 'brasileiro',
        nis: randomUUID(),
        nome: 'jhon doe',
        pai: 'nome do pai',
        ra: randomUUID(),
        responsavel: 'responsavel',
        rg: randomUUID(),
        rgResponsavel: randomUUID(),
        serieEscola: '5 ano',
        sexo: 'masculino',
        ultimaProcedencia: '',
        documentos: [],
      });

      init++;
    }

    const alunos = await sut.execute({ page: 2 });
    expect(alunos.alunos).toHaveLength(2);
    expect(alunos.total).toEqual(22);
  });
});
