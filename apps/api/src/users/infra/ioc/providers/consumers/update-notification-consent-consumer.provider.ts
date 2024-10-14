import { Provider } from '@nestjs/common';
import { EventHandler, Events, SharedProvider } from '@repo/shared';
import { UpdateNotificationConsent } from '@users/application/consumers';
import {
  NotificationTypeRepository,
  UserRepository,
} from '@users/domain/repositories';
import { AccountProvider } from '@users/infra/ioc/account-provider';

export class UpdateNotificationConsentConsumerProviderFactory {
  static generate(): Provider {
    return {
      provide: AccountProvider.CONSUMERS.UPDATE_NOTIFICATION_CONSENT,
      useFactory: async (
        eventHandler: EventHandler,
        userRepository: UserRepository,
        notificationTypeRepository: NotificationTypeRepository,
      ): Promise<UpdateNotificationConsent.Contract> => {
        const consumer = new UpdateNotificationConsent(
          userRepository,
          notificationTypeRepository,
        );
        await eventHandler.consume(
          Events.Queues.NOTIFICATION_CONSENTS_QUEUE,
          consumer,
        );
        return consumer;
      },
      inject: [
        SharedProvider.EVENT_HANDLER,
        AccountProvider.REPOSITORIES.USER_REPOSITORY,
        AccountProvider.REPOSITORIES.NOTIFICATION_TYPE_REPOSITORY,
      ],
    };
  }
}
