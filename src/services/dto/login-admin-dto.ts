import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminRequestDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
