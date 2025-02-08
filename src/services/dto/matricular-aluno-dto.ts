import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MatricularAlunoRequestDto {
  @ApiProperty()
  alunoId: string;

  @ApiProperty()
  atendido: string;

  @ApiProperty()
  telefoneMae: string;

  @ApiProperty()
  telefonePai: string | null;

  @ApiProperty()
  telefoneRecado: string | null;

  @ApiProperty()
  responsavelLegal: string;

  @ApiProperty()
  anoMatricula: number;

  @ApiPropertyOptional()
  documentos?: string[];
}
