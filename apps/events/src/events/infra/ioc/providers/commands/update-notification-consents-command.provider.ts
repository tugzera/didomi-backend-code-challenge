import { UpdateNotificationConsentsCommand } from '@events/application/commands';
import { EventRepository } from '@events/domain/repositories';
import { EventProvider } from '@events/infra/ioc/event-provider';
import { Provider } from '@nestjs/common';
import { EventHandler, SharedProvider } from '@repo/shared';

export class UpdateNotificationConsentsCommandProviderFactory {
  static generate(): Provider {
    return {
      provide: EventProvider.COMMANDS.UPDATE_NOTIFICATION_CONSENTS,
      useFactory: (
        eventRepository: EventRepository,
        eventHandler: EventHandler,
      ): UpdateNotificationConsentsCommand.Contract => {
        return new UpdateNotificationConsentsCommand(
          eventRepository,
          eventHandler,
        );
      },
      inject: [
        EventProvider.REPOSITORIES.EVENT_REPOSITORY,
        SharedProvider.EVENT_HANDLER,
      ],
    };
  }
}
