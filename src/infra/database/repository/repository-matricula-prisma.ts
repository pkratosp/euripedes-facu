import { RepositoryMatricula } from '@/repositories/repository-matricula';
import { Injectable } from '@nestjs/common';
import { Matriculas } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RepositoryMatriculaPrisma implements RepositoryMatricula {
  constructor(private readonly prismaService: PrismaService) {}

  async matricularAluno(data: Matriculas): Promise<void> {
    await this.prismaService.matriculas.create({
      data: data,
    });
  }

  async rematricularAluno(data: Matriculas): Promise<void> {
    await this.prismaService.matriculas.create({
      data: data,
    });
  }
}
