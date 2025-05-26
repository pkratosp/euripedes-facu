import { ApiProperty } from '@nestjs/swagger';

export class ListarTodasMatriculasDeletadasDto {
  @ApiProperty()
  page: number;
}
