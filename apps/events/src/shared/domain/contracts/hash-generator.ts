export interface HashGenerator {
  hash(value: string): string;
  compare(value: string, hash: string): boolean;
}
