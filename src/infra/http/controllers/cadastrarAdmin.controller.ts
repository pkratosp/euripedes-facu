import { CadastrarAdmin } from '@/services/cadastrar-admin';
import { CadastrarAdminRequestDto } from '@/services/dto/cadastrar-admin-dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/admin')
export class CadastrarAdminController {
  constructor(private readonly cadastrarAdmin: CadastrarAdmin) {}

  @Post()
  async handle(@Body() data: CadastrarAdminRequestDto) {
    try {
      await this.cadastrarAdmin.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
