export abstract class RepositoryHash {
  abstract compare(string: string, hash: string): Promise<boolean>;
  abstract saltHash(string: string, salt: number): Promise<{ hash: string }>;
}
