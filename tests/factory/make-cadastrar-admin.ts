import { PrismaService } from '@/infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

export function makeCadastrarAdmin(
  override: Partial<User> = {},
  id?: string,
): User {
  return {
    id: id ?? randomUUID(),
    nome: faker.person.fullName(),
    username: faker.internet.email(),
    password: faker.internet.password(),
    ...override,
  };
}

@Injectable()
export class FactoryCadastrarAdmin {
  constructor(private readonly prismaService: PrismaService) {}

  async makePrismaCadastrarAdmin(data: Partial<User> = {}) {
    const usuario = makeCadastrarAdmin(data);

    const hashPassword = await hash(usuario.password, 6);

    await this.prismaService.user.create({
      data: {
        ...usuario,
        password: hashPassword,
      },
    });

    return usuario;
  }
}
