import { EventConsumerProviderFactory } from '@events/infra/ioc/providers/event-consumer.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [EventConsumerProviderFactory.generate()],
})
export class EventModule {}
