import { Matriculas } from '@prisma/client';

export abstract class RepositoryMatricula {
  abstract matricularAluno(data: Matriculas): Promise<void>;
  abstract rematricularAluno(data: Matriculas): Promise<void>;
}
