import { ApiProperty } from '@nestjs/swagger';

export class BuscarNomeAlunoDto {
  @ApiProperty()
  name: string;
}
