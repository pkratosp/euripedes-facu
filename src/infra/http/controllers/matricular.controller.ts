import { MatricularAlunoRequestDto } from '@/services/dto/matricular-aluno-dto';
import { MatricularAluno } from '@/services/matricular-aluno';
import { Body, Controller, Post } from '@nestjs/common';

// const matricularAlunoBodyScheme = z.object({
//   alunoId: z.string(),
//   atendido: z.string(),
//   telefoneMae: z.string(),
//   telefonePai: z.string().nullable(),
//   telefoneRecado: z.string().nullable(),
//   responsavelLegal: z.string(),
//   anoMatricula: z.number(),
//   documentos: z.array(z.string()).optional(),
// });

// const bodyValidationPipe = new ZodValidationPipe(matricularAlunoBodyScheme);

// type MatricularAlunoRequestDto = z.infer<typeof matricularAlunoBodyScheme>;

@Controller('matriculas')
export class MatriculaController {
  constructor(private readonly matricularAluno: MatricularAluno) {}

  @Post()
  async handle(@Body() data: MatricularAlunoRequestDto) {
    try {
      const { id } = await this.matricularAluno.execute(data);

      return {
        id,
      };
    } catch (error) {
      throw error;
    }
  }
}
