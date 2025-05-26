import { Module } from '@nestjs/common';

// services ou casos de uso
import { BuscarDadosAluno } from '@/services/buscar-dados-aluno';
import { BuscarOcorrencias } from '@/services/buscar-ocorrencias';
import { BuscarPerguntas } from '@/services/buscar-perguntas';
import { BuscarRespostasPorMatricula } from '@/services/buscar-respostas-por-matricula';
import { CadastrarAluno } from '@/services/cadastrar-aluno';
import { CadastrarOcorrencia } from '@/services/cadastrar-ocorrencia';
import { CriarPerguntas } from '@/services/criar-perguntas';
import { EditarAluno } from '@/services/editar-aluno';
import { MatricularAluno } from '@/services/matricular-aluno';
import { ResponderPerguntas } from '@/services/responder-perguntas';
import { DatabaseModule } from '../database/database.module';
import { StorageModule } from './storage/storage.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { UploadDocumento } from '@/services/upload-documento';
import { CadastrarAdmin } from '@/services/cadastrar-admin';
import { LoginAdmin } from '@/services/login-admin';
import { ListarTodosAlunos } from '@/services/listar-todos-alunos';
import { ListarTodasMatriculas } from '@/services/listar-todas-matriculas';
import { ListaAlunosNomes } from '@/services/lista-alunos-nomes';
import { ListarTodasPerguntas } from '@/services/listar-todas-perguntas';
import { RematricularAluno } from '@/services/rematricular-aluno';
import { EditarDadosMatricula } from '@/services/editar-dados-matricula';
import { DesmatricularAluno } from '@/services/desmatricular-aluno';
import { BuscarMatriculaPorNome } from '@/services/buscar-matricula-por-nome';
import { BuscarTodosDocumentos } from '@/services/buscar-todos-documentos';
import { BuscarNomeAluno } from '@/services/buscar-nome-aluno';
import { BuscarDocumento } from '@/services/buscar-documento';
import { ListarTodasMatriculasDeletadas } from '@/services/listar-todas-matriculas-deletadas';
import { BuscarDesmatriculadosPorNome } from '@/services/buscar-desmatriculados-por-nome';

// controllers
import { BuscarDadosAlunoController } from './controllers/buscarDadosAluno.controller';
import { BuscarOcorrenciasController } from './controllers/buscarOcorrencias.controller';
import { CadastrarAdminController } from './controllers/cadastrarAdmin.controller';
import { CadastrarOcorrenciasController } from './controllers/cadastrarOcorrencias.controller';
import { CadastrarAlunoController } from './controllers/cadastrarAluno.controller';
import { CriarPerguntasController } from './controllers/criarPergunta.controller';
import { EditarAlunoController } from './controllers/editarDadosAluno.controller';
import { LoginAdminController } from './controllers/loginAdmin.controller';
import { MatriculaController } from './controllers/matricular.controller';
import { ResponderPerguntasController } from './controllers/responderPerguntas.controller';
import { UploadDocumentoController } from './controllers/uploadDocumento.controller';
import { ListarTodosAlunosController } from './controllers/listarTodosAlunos.controller';
import { ListarTodasMatriculasController } from './controllers/listarTodasMatriculas.controller';
import { ListaAlunosNomesController } from './controllers/listaAlunosNomes.controller';
import { BuscarRespostasPorMatriculaController } from './controllers/buscarRespostasPorMatricula.controller';
import { RematricularAlunoController } from './controllers/rematricularAluno.controller';
import { EditarDadosMatriculaController } from './controllers/editarDadosMatricula.controller';
import { DesmatricularAlunoController } from './controllers/desmatricularAluno.controller';
import { ListarTodasPerguntasController } from './controllers/listarTodasPerguntas.controller';
import { BuscarDocumentosController } from './controllers/buscarDocumentos.controller';
import { BuscarTodosDocumentosMatriculaController } from './controllers/buscarTodosDocumentosMatricula.controller';
import { BuscarTodosDocumentosAlunoController } from './controllers/buscarTodosDocumentosAluno.controller';
import { BuscarNomeAlunoController } from './controllers/buscarNomeAluno.controller';
import { BuscarMatriculaPorNomeController } from './controllers/buscarMatriculaPorNome.controller';
import { ListarTodasMatriculasDeletadasController } from './controllers/listarTodasMatriculasDeletadas.controller';
import { BuscarDesmatriculadosPorNomeController } from './controllers/buscarDesmatriculadosPorNome.controller';

@Module({
  imports: [DatabaseModule, StorageModule, CryptographyModule],
  controllers: [
    BuscarDadosAlunoController,
    BuscarOcorrenciasController,
    CadastrarAdminController,
    CadastrarOcorrenciasController,
    CadastrarAlunoController,
    CriarPerguntasController,
    EditarAlunoController,
    LoginAdminController,
    MatriculaController,
    ResponderPerguntasController,
    UploadDocumentoController,
    ListarTodosAlunosController,
    ListarTodasMatriculasController,
    ListaAlunosNomesController,
    BuscarRespostasPorMatriculaController,
    ListarTodasPerguntasController,
    RematricularAlunoController,
    EditarDadosMatriculaController,
    DesmatricularAlunoController,
    BuscarDocumentosController,
    BuscarTodosDocumentosMatriculaController,
    BuscarTodosDocumentosAlunoController,
    BuscarNomeAlunoController,
    BuscarMatriculaPorNomeController,
    ListarTodasMatriculasDeletadasController,
    BuscarDesmatriculadosPorNomeController,
  ],
  providers: [
    BuscarDadosAluno,
    BuscarOcorrencias,
    BuscarPerguntas,
    BuscarRespostasPorMatricula,
    CadastrarAluno,
    CadastrarOcorrencia,
    CriarPerguntas,
    EditarAluno,
    MatricularAluno,
    ResponderPerguntas,
    UploadDocumento,
    CadastrarAdmin,
    LoginAdmin,
    ListarTodosAlunos,
    ListarTodasMatriculas,
    ListaAlunosNomes,
    ListarTodasPerguntas,
    RematricularAluno,
    EditarDadosMatricula,
    DesmatricularAluno,
    BuscarDocumento,
    BuscarTodosDocumentos,
    BuscarNomeAluno,
    BuscarMatriculaPorNome,
    ListarTodasMatriculasDeletadas,
    BuscarDesmatriculadosPorNome,
  ],
})
export class HttpModule {}
