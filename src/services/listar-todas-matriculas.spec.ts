import { InMemoryRepositoryAluno } from 'tests/in-memory/in-memory-repository-aluno';
import { ListarTodasMatriculas } from './listar-todas-matriculas';
import { InMemoryRepositoryMatricula } from 'tests/in-memory/in-memory-repository-matricula';
import { MatricularAluno } from './matricular-aluno';
import { CadastrarAluno } from './cadastrar-aluno';
import { randomUUID } from 'node:crypto';

let inMemoryRepositoryAluno: InMemoryRepositoryAluno;
let inMemoryRepositoryMatricula: InMemoryRepositoryMatricula;
let matricularAluno: MatricularAluno;
let cadastrarAluno: CadastrarAluno;
let sut: ListarTodasMatriculas;

describe('Listar todas matriculas', () => {
  beforeEach(() => {
    inMemoryRepositoryAluno = new InMemoryRepositoryAluno();
    inMemoryRepositoryMatricula = new InMemoryRepositoryMatricula();
    matricularAluno = new MatricularAluno(inMemoryRepositoryMatricula);
    cadastrarAluno = new CadastrarAluno(inMemoryRepositoryAluno);
    sut = new ListarTodasMatriculas(inMemoryRepositoryMatricula);
  });

  it('Deve listar todas as matriculas', async () => {
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

    const matriculas = await sut.execute({ page: 1 });

    expect(matriculas.matriculas).toHaveLength(1);
    expect(matriculas.total).toBe(1);
  });

  it('Deve listar matriculas por pagina', async () => {
    for (let i = 0; i < 22; i++) {
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

      await matricularAluno.execute({
        alunoId: inMemoryRepositoryAluno.alunos[0].id,
        anoMatricula: new Date().getFullYear(),
        atendido: '',
        responsavelLegal: 'mae',
        telefoneMae: randomUUID(),
        telefonePai: randomUUID(),
        telefoneRecado: randomUUID(),
        documentos: [],
      });
    }

    const { matriculas, total } = await sut.execute({ page: 2 });

    expect(matriculas).toHaveLength(2);
    expect(total).toBe(22);
  });
});
