import { HashGenerator } from '@shared/domain/contracts';
import { compareSync, hashSync } from 'bcrypt';

export class BcryptHashAdapter implements HashGenerator {
  private HASH_ROUNDS = 13;

  hash(value: string): string {
    return hashSync(value, this.HASH_ROUNDS);
  }

  compare(value: string, hash: string): boolean {
    return compareSync(value, hash);
  }
}
