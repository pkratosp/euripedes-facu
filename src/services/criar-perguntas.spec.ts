import { InMemoryRepositoryFormulario } from 'tests/in-memory/in-memory-repository-formulario';
import { CriarPerguntas } from './criar-perguntas';

let inMemoryRepositoryFormulario: InMemoryRepositoryFormulario;
let sut: CriarPerguntas;

describe('Criar perguntas', () => {
  beforeEach(() => {
    inMemoryRepositoryFormulario = new InMemoryRepositoryFormulario();
    sut = new CriarPerguntas(inMemoryRepositoryFormulario);
  });

  it('deve ser possivel criar uma pergunta', async () => {
    await sut.execute({
      descricao: 'descrição da pergunta',
      titulo: 'pergunta',
    });

    expect(inMemoryRepositoryFormulario.perguntas).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          descricao: 'descrição da pergunta',
          titulo: 'pergunta',
        }),
      ]),
    );
  });
});
