import {
  CadastrarAdmin,
  CadastrarAdminRequest,
} from '@/services/cadastrar-admin';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/admin')
export class CriarAdminController {
  constructor(private readonly cadastrarAdmin: CadastrarAdmin) {}

  @Post()
  async handle(@Body() data: CadastrarAdminRequest) {
    try {
      await this.cadastrarAdmin.execute(data);
    } catch (error) {
      throw error;
    }
  }
}
