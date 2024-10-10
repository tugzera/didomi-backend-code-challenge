import { EventConsumer } from '@events/application/consumers/event-consumer';
import { EventProvider } from '@events/infra/ioc/event-provider';
import { Provider } from '@nestjs/common';
import { EventHandler } from '@shared/domain/contracts';
import { SharedProvider } from '@shared/infra/ioc/shared-provider';

export class EventConsumerProviderFactory {
  static generate(): Provider {
    return {
      provide: EventProvider.CONSUMERS.EVENT_CONSUMER,
      useFactory: async (
        eventHandler: EventHandler,
      ): Promise<EventConsumer.Contract> => {
        const consumer = new EventConsumer();
        eventHandler.consume('events_queue', consumer.execute);
        return consumer;
      },
      inject: [SharedProvider.EVENT_HANDLER],
    };
  }
}
