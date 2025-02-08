import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { RepositoryAluno } from '@/repositories/repository-aluno';
import { RepositoryAlunoPrisma } from './repository/repository-aluno-prisma';
import { RepositoryFormulario } from '@/repositories/repository-formulario';
import { RepositoryFormularioPrisma } from './repository/repository-formulario-prisma';
import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { RepositoryMatriculaPrisma } from './repository/repository-matricula-prisma';
import { RepositoryOcorrencia } from '@/repositories/repository-ocorrencia';
import { RepositoryOcorrenciaPrisma } from './repository/repository-ocorrencia-prisma';
import { RepositoryDocumentos } from '@/repositories/repository-documentos';
import { RepositoryDocumentosPrisma } from './repository/repository-documentos-prisma';
import { RepositoryAdmin } from '@/repositories/repository-admin';
import { RepositoryAdminPrisma } from './repository/repository-admin-prisma';

@Module({
  providers: [
    PrismaService,
    {
      provide: RepositoryAluno,
      useClass: RepositoryAlunoPrisma,
    },
    {
      provide: RepositoryFormulario,
      useClass: RepositoryFormularioPrisma,
    },
    {
      provide: RepositoryMatricula,
      useClass: RepositoryMatriculaPrisma,
    },
    {
      provide: RepositoryOcorrencia,
      useClass: RepositoryOcorrenciaPrisma,
    },
    {
      provide: RepositoryDocumentos,
      useClass: RepositoryDocumentosPrisma,
    },
    {
      provide: RepositoryAdmin,
      useClass: RepositoryAdminPrisma,
    },
  ],
  exports: [
    PrismaService,
    RepositoryAluno,
    RepositoryFormulario,
    RepositoryMatricula,
    RepositoryOcorrencia,
    RepositoryDocumentos,
    RepositoryAdmin,
  ],
})
export class DatabaseModule {}
