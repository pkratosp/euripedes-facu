import { ApiProperty } from '@nestjs/swagger';

export class CadastrarAdminRequestDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
