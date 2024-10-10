import { UpdateNotificationConsentsCommand } from '@events/application/commands';
import { EventProvider } from '@events/infra/ioc/event-provider';
import { Provider } from '@nestjs/common';
import { EventHandler } from '@shared/domain/contracts';
import { SharedProvider } from '@shared/infra/ioc/shared-provider';

export class UpdateNotificationConsentsCommandProviderFactory {
  static generate(): Provider {
    return {
      provide: EventProvider.COMMANDS.UPDATE_NOTIFICATION_CONSENTS,
      useFactory: (
        eventHandler: EventHandler,
      ): UpdateNotificationConsentsCommand.Contract => {
        return new UpdateNotificationConsentsCommand(eventHandler);
      },
      inject: [SharedProvider.EVENT_HANDLER],
    };
  }
}
