import { EventConsumer } from '@events/application/consumers/event-consumer';
import { EventRepository } from '@events/domain/repositories';
import { EventProvider } from '@events/infra/ioc/event-provider';
import { Provider } from '@nestjs/common';
import { EventHandler, Events, SharedProvider } from '@repo/shared';

export class EventConsumerProviderFactory {
  static generate(): Provider {
    return {
      provide: EventProvider.CONSUMERS.EVENT_CONSUMER,
      useFactory: async (
        eventHandler: EventHandler,
        eventRepository: EventRepository,
      ): Promise<EventConsumer.Contract> => {
        const consumer = new EventConsumer(eventRepository);
        await eventHandler.consume(Events.Queues.EVENTS_QUEUE, consumer);
        return consumer;
      },
      inject: [
        SharedProvider.EVENT_HANDLER,
        EventProvider.REPOSITORIES.EVENT_REPOSITORY,
      ],
    };
  }
}
