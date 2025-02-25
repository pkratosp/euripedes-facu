import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EditarDadosMatriculaDto {
  @ApiProperty()
  atendido: string;

  @ApiProperty()
  telefoneMae: string;

  @ApiProperty()
  telefonePai: string;

  @ApiProperty()
  telefoneRecado: string;

  @ApiProperty()
  responsavelLegal: string;

  @ApiPropertyOptional()
  documentos?: string[];
}
