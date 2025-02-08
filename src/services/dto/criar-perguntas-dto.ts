import { ApiProperty } from '@nestjs/swagger';

export class CriarPerguntasRequestDto {
  @ApiProperty()
  titulo: string;

  @ApiProperty()
  descricao: string;
}
