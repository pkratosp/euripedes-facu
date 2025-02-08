import { RepositoryHash } from '@/repositories/repository-hash';
import { Injectable } from '@nestjs/common';
import { hash, compare as compareHash } from 'bcryptjs';

@Injectable()
export class RepositoryCryptography implements RepositoryHash {
  async compare(string: string, hash: string): Promise<boolean> {
    return await compareHash(string, hash);
  }

  async saltHash(string: string, salt: number): Promise<{ hash: string }> {
    const hashString = await hash(string, salt);

    return {
      hash: hashString,
    };
  }
}
