import { ApiProperty } from '@nestjs/swagger';

export class BuscarDesmatriculadosPorNomeDto {
  @ApiProperty()
  name: string;
}
