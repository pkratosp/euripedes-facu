import { Public } from '@/infra/auth/public';
import { LoginAdmin, LoginAdminRequest } from '@/services/login-admin';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/login')
@Public()
export class LoginAdminController {
  constructor(private readonly loginAdmin: LoginAdmin) {}

  @Post()
  async handle(@Body() data: LoginAdminRequest) {
    try {
      await this.loginAdmin.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
