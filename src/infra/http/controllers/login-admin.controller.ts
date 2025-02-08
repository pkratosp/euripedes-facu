import { Public } from '@/infra/auth/public';
import { LoginAdminRequestDto } from '@/services/dto/login-admin-dto';
import { LoginAdmin } from '@/services/login-admin';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/login')
@Public()
export class LoginAdminController {
  constructor(private readonly loginAdmin: LoginAdmin) {}

  @Post()
  async handle(@Body() data: LoginAdminRequestDto) {
    try {
      return await this.loginAdmin.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
