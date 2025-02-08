import { RepositoryEncrypter } from '@/repositories/repository-encrypter';

export class FakeEncrypter implements RepositoryEncrypter {
  async encrypt(
    payloady: Record<string, unknown>,
  ): Promise<{ access_token: string }> {
    return {
      access_token: JSON.stringify(payloady),
    };
  }
}
