import 'dotenv/config';

import { readFileSync } from 'fs';

export class MigrationFileHelper {
  static read(path: string) {
    return readFileSync(path, { encoding: 'utf-8' });
  }
}
