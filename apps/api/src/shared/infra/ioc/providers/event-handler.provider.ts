import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventHandler } from '@shared/domain/contracts';
import { RabbitMQEventHandlerAdapter } from '@shared/infra/events/rabbitmq-event-handler.adapter';
import { SharedProvider } from '../shared-provider';

export class EventHandlerProviderFactory {
  static generate(): Provider {
    return {
      provide: SharedProvider.EVENT_HANDLER,
      useFactory: async (
        configService: ConfigService,
      ): Promise<EventHandler> => {
        const eventHandler = RabbitMQEventHandlerAdapter.getInstance({
          rmqUser: configService.getOrThrow('RABBITMQ_USER'),
          rmqPass: configService.getOrThrow('RABBITMQ_PASSWORD'),
          rmqHost: configService.getOrThrow('RABBITMQ_HOST'),
          rmqPort: configService.getOrThrow('RABBITMQ_PORT'),
        });
        await eventHandler.connect();
        return eventHandler;
      },
      inject: [ConfigService],
    };
  }
}
