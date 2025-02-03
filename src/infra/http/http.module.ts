import { Module } from '@nestjs/common';
import { AlunoController } from './controllers/aluno.controller';
import { MatriculaController } from './controllers/matricula.controller';
import { OcorrenciaController } from './controllers/ocorrencia.controller';
import { FormularioController } from './controllers/formulario.controller';
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
import { UploadFileController } from './controllers/upload-file.controller';

@Module({
  imports: [DatabaseModule, StorageModule, StorageModule],
  controllers: [
    AlunoController,
    MatriculaController,
    OcorrenciaController,
    FormularioController,
    UploadFileController,
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
  ],
})
export class HttpModule {}
