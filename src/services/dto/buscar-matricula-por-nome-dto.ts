import { ApiProperty } from '@nestjs/swagger';

export class BuscarMatriculaPorNomeDto {
  @ApiProperty()
  name: string;
}
