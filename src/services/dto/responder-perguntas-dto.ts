import { ApiProperty } from '@nestjs/swagger';

export class ResponderPerguntasRequestDto {
  @ApiProperty()
  resposta: string;

  @ApiProperty()
  perguntasId: string | null;

  @ApiProperty()
  matriculaId: string;
}
