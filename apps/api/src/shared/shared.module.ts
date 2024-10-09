import { Global, Module } from '@nestjs/common';
import {
  DatabaseConnectionProviderFactory,
  EventHandlerProviderFactory,
  HashGeneratorProviderFactory,
} from './infra/ioc/providers';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    DatabaseConnectionProviderFactory.generate(),
    HashGeneratorProviderFactory.generate(),
    EventHandlerProviderFactory.generate(),
  ],
  exports: [
    DatabaseConnectionProviderFactory.generate(),
    HashGeneratorProviderFactory.generate(),
    EventHandlerProviderFactory.generate(),
  ],
})
export class SharedModule {}
