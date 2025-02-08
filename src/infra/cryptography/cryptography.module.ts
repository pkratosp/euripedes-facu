import { Module } from '@nestjs/common';
import { RepositoryCryptography } from './repository-cryptography';
import { RepositoryHash } from '@/repositories/repository-hash';
import { RepositoryEncrypter } from '@/repositories/repository-encrypter';
import { RepositoryEncrypterJwt } from './repository-encrypter';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    {
      provide: RepositoryHash,
      useClass: RepositoryCryptography,
    },
    {
      provide: RepositoryEncrypter,
      useClass: RepositoryEncrypterJwt,
    },
  ],
  exports: [RepositoryHash, RepositoryEncrypter],
})
export class CryptographyModule {}
