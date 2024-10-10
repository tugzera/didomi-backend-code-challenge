import { UpdateNotificationConsentsCommandProviderFactory } from '@events/infra/ioc/providers/commands';
import { EventConsumerProviderFactory } from '@events/infra/ioc/providers/consumers';
import { EventRepositoryProviderFactory } from '@events/infra/ioc/providers/repositories';
import { EventController } from '@events/presentation/controller/event.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [EventController],
  providers: [
    EventRepositoryProviderFactory.generate(),
    EventConsumerProviderFactory.generate(),
    UpdateNotificationConsentsCommandProviderFactory.generate(),
  ],
})
export class EventModule {}
