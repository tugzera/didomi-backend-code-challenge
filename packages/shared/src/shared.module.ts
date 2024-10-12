import { Global, Module } from '@nestjs/common';
import {
  EventHandlerProviderFactory,
  HashGeneratorProviderFactory,
} from './infra/ioc/providers';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    HashGeneratorProviderFactory.generate(),
    EventHandlerProviderFactory.generate(),
  ],
  exports: [
    HashGeneratorProviderFactory.generate(),
    EventHandlerProviderFactory.generate(),
  ],
})
export class SharedModule {}
