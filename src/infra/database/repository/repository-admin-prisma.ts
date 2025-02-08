import { RepositoryAdmin } from '@/repositories/repository-admin';
import { CadastrarAdminRequestDto } from '@/services/dto/cadastrar-admin-dto';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RepositoryAdminPrisma implements RepositoryAdmin {
  constructor(private readonly prismaService: PrismaService) {}

  async buscarUsuario(username: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async cadastrarUsuario(data: CadastrarAdminRequestDto): Promise<void> {
    await this.prismaService.user.create({
      data: data,
    });
  }
}
