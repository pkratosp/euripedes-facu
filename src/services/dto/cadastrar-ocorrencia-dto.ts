import { ApiProperty } from '@nestjs/swagger';

export class CadastrarOcorrenciaRequestDto {
  @ApiProperty()
  titulo: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  alunoId: string;
}
