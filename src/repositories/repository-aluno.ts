import { CadastrarAlunoRequestDto } from '@/services/dto/cadastrar-aluno-dto';
import { EditarAlunoRequest } from '@/services/editar-aluno';
import { Aluno } from '@prisma/client';

export abstract class RepositoryAluno {
  abstract criarAluno(data: CadastrarAlunoRequestDto): Promise<void>;
  abstract editarAluno(data: EditarAlunoRequest, id: string): Promise<void>;
  abstract buscarDadosDoAluno(id: string): Promise<Aluno | null>;
  abstract buscarAlunoPorCpf(cpf: string): Promise<Aluno | null>;
  abstract buscarAlunoPorRG(rg: string): Promise<Aluno | null>;
  abstract buscarAlunoPorRA(ra: string): Promise<Aluno | null>;
}
