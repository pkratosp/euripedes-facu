import { InMemoryRepositoryFormulario } from 'tests/in-memory/in-memory-repository-formulario';
import { BuscarPerguntas } from './buscar-perguntas';
import { CriarPerguntas } from './criar-perguntas';

let inMemoryRepositoryFormulario: InMemoryRepositoryFormulario;
let sut: BuscarPerguntas;
let cadastrarPergunta: CriarPerguntas;

describe('Buscar todas perguntas', () => {
  beforeEach(() => {
    inMemoryRepositoryFormulario = new InMemoryRepositoryFormulario();
    sut = new BuscarPerguntas(inMemoryRepositoryFormulario);
    cadastrarPergunta = new CriarPerguntas(inMemoryRepositoryFormulario);
  });

  it('Deve listar todas perguntas', async () => {
    for (let i = 0; i < 20; i++) {
      await cadastrarPergunta.execute({
        descricao: 'descrição',
        titulo: `titulo pergunta ${i}`,
      });
    }

    const perguntas = await sut.execute();

    expect(perguntas).toHaveLength(20);
  });
});
