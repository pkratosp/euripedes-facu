import { InMemoryRepositoryDocumentos } from 'tests/in-memory/in-memory-repository-documentos';
import { UploadDocumento } from './upload-documento';
import { FakeUploader } from 'tests/factory/fakerUplaoder';
import { ArquivoInvalidoError } from './errors/arquivo-invalido-error';

let inMemoryRepositoryDocumentos: InMemoryRepositoryDocumentos;
let sut: UploadDocumento;
let fakeUploader: FakeUploader;

describe('Anexar arquivo', () => {
  beforeEach(() => {
    inMemoryRepositoryDocumentos = new InMemoryRepositoryDocumentos();
    fakeUploader = new FakeUploader();
    sut = new UploadDocumento(fakeUploader, inMemoryRepositoryDocumentos);
  });

  it('deve anexar arquivo valido', async () => {
    await sut.execute({
      buffer: Buffer.from(''),
      fileName: 'file-test.jpeg',
      fileType: 'image/jpeg',
    });

    expect(inMemoryRepositoryDocumentos.documentosArquivo).toHaveLength(1);
  });

  it('nao deve anexar arquivo invalido', async () => {
    expect(async () => {
      await sut.execute({
        buffer: Buffer.from(''),
        fileName: 'file-test.mp3',
        fileType: 'audio/mp3',
      });
    }).rejects.toThrow(new ArquivoInvalidoError());
    expect(inMemoryRepositoryDocumentos.documentosArquivo).toHaveLength(0);
  });
});
