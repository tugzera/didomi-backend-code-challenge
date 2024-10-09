import { Global, Module } from '@nestjs/common';
import {
  DatabaseConnectionProviderFactory,
  HashGeneratorProviderFactory,
} from './infra/ioc/providers';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    DatabaseConnectionProviderFactory.generate(),
    HashGeneratorProviderFactory.generate(),
  ],
  exports: [
    DatabaseConnectionProviderFactory.generate(),
    HashGeneratorProviderFactory.generate(),
  ],
})
export class SharedModule {}
