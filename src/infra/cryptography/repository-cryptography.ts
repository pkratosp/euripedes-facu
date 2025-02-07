import { RepositoryHash } from '@/repositories/repository-hash';
import { hash, compare as compareHash } from 'bcryptjs';

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
