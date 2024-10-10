import { EventConsumerProviderFactory } from '@events/infra/ioc/providers/consumers';
import { EventRepositoryProviderFactory } from '@events/infra/ioc/providers/repositories';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [
    EventRepositoryProviderFactory.generate(),
    EventConsumerProviderFactory.generate(),
  ],
})
export class EventModule {}
