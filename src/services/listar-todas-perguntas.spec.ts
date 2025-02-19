import { InMemoryRepositoryFormulario } from 'tests/in-memory/in-memory-repository-formulario';
import { CriarPerguntas } from './criar-perguntas';
import { ListarTodasPerguntas } from './listar-todas-perguntas';
import { InMemoryRepositoryAluno } from 'tests/in-memory/in-memory-repository-aluno';

let inMemoryRepositoryAluno: InMemoryRepositoryAluno;
let inMemoryRepositoryFormulario: InMemoryRepositoryFormulario;
let criarPerguntas: CriarPerguntas;
let sut: ListarTodasPerguntas;

describe('Listar todas as perguntas', () => {
  beforeEach(() => {
    inMemoryRepositoryAluno = new InMemoryRepositoryAluno();
    inMemoryRepositoryFormulario = new InMemoryRepositoryFormulario();
    criarPerguntas = new CriarPerguntas(inMemoryRepositoryFormulario);
    sut = new ListarTodasPerguntas(inMemoryRepositoryFormulario);
  });

  it('deve listar todas as perguntas', async () => {
    await criarPerguntas.execute({
      descricao: 'descricao',
      titulo: 'pergunta1',
    });

    await criarPerguntas.execute({
      descricao: 'descricao',
      titulo: 'pergunta1',
    });

    const perguntas = await sut.execute();

    expect(perguntas.length).toBe(2);
  });
});
