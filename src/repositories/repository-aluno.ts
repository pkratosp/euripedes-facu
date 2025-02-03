import { CadastrarAlunoRequest } from '@/services/cadastrar-aluno';
import { EditarAlunoRequest } from '@/services/editar-aluno';
import { Aluno } from '@prisma/client';

export abstract class RepositoryAluno {
  abstract criarAluno(data: CadastrarAlunoRequest): Promise<void>;
  abstract editarAluno(data: EditarAlunoRequest, id: string): Promise<void>;
  abstract buscarDadosDoAluno(id: string): Promise<Aluno | null>;
}
