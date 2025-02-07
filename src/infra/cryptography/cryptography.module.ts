import { Module } from '@nestjs/common';
import { RepositoryCryptography } from './repository-cryptography';
import { RepositoryHash } from '@/repositories/repository-hash';

@Module({
  providers: [
    {
      provide: RepositoryHash,
      useClass: RepositoryCryptography,
    },
  ],
})
export class CryptographyModule {}
