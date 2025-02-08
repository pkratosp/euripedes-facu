export abstract class RepositoryEncrypter {
  abstract encrypt(
    payload: Record<string, unknown>,
  ): Promise<{ access_token: string }>;
}
