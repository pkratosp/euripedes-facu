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
import { RematricularAluno } from '@/services/rematricular-aluno';
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
import { BuscarRespostasPorMatriculaController } from './controllers/buscarRespostasPorMatricula.controller';

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
import { RematricularAlunoController } from './controllers/rematricularAluno.controller';
import { ResponderPerguntasController } from './controllers/responderPerguntas.controller';
import { UploadDocumentoController } from './controllers/uploadDocumento.controller';
import { ListarTodosAlunosController } from './controllers/listarTodosAlunos.controller';
import { ListarTodasMatriculasController } from './controllers/listarTodasMatriculas.controller';
import { ListaAlunosNomesController } from './controllers/listaAlunosNomes.controller';

@Module({
  imports: [DatabaseModule, StorageModule, StorageModule, CryptographyModule],
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
    RematricularAlunoController,
    ResponderPerguntasController,
    UploadDocumentoController,
    ListarTodosAlunosController,
    ListarTodasMatriculasController,
    ListaAlunosNomesController,
    BuscarRespostasPorMatriculaController,
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
    RematricularAluno,
    ResponderPerguntas,
    UploadDocumento,
    CadastrarAdmin,
    LoginAdmin,
    ListarTodosAlunos,
    ListarTodasMatriculas,
    ListaAlunosNomes,
  ],
})
export class HttpModule {}
