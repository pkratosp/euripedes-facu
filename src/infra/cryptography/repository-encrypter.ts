import { RepositoryEncrypter } from '@/repositories/repository-encrypter';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RepositoryEncrypterJwt implements RepositoryEncrypter {
  constructor(private readonly jwtService: JwtService) {}

  async encrypt(
    payload: Record<string, unknown>,
  ): Promise<{ access_token: string }> {
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
