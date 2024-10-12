import { Provider } from '@nestjs/common';
import { HashGenerator } from '../../../domain/contracts';
import { BcryptHashAdapter } from '../../../infra/hash';
import { SharedProvider } from '../../../infra/ioc';

export class HashGeneratorProviderFactory {
  static generate(): Provider {
    return {
      provide: SharedProvider.HASH_GENERATOR,
      useFactory: (): HashGenerator => {
        return new BcryptHashAdapter();
      },
      inject: [],
    };
  }
}
