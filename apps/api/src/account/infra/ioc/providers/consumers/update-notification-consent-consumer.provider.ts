import { UpdateNotificationConsent } from '@account/application/consumers';
import {
  NotificationTypeRepository,
  UserRepository,
} from '@account/domain/repositories';
import { AccountProvider } from '@account/infra/ioc/account-provider';
import { Provider } from '@nestjs/common';
import { EventHandler } from '@shared/domain/contracts';
import { SharedProvider } from '@shared/infra/ioc/shared-provider';

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
        await eventHandler.consume('notification_consents_queue', consumer);
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
