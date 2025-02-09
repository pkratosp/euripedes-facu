import { Public } from '@/infra/auth/public';
import { LoginAdminRequestDto } from '@/services/dto/login-admin-dto';
import { UsuarioInvalidoError } from '@/services/errors/usuario-invalido-error';
import { LoginAdmin } from '@/services/login-admin';
import {
  UnauthorizedException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';

@Controller('/login')
@Public()
export class LoginAdminController {
  constructor(private readonly loginAdmin: LoginAdmin) {}

  @Post()
  async handle(@Body() data: LoginAdminRequestDto) {
    try {
      return await this.loginAdmin.execute(data);
    } catch (error) {
      if (error instanceof UsuarioInvalidoError) {
        throw new UnauthorizedException();
      }

      throw new InternalServerErrorException();
    }
  }
}
