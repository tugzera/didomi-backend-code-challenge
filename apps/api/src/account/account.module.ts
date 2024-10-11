import {
  CreateUserProviderFactory,
  DeleteUserProviderFactory,
  UpdateUserProviderFactory,
} from '@account/infra/ioc/providers/commands';
import { UpdateNotificationConsentConsumerProviderFactory } from '@account/infra/ioc/providers/consumers';
import { GetUserListProviderFactory } from '@account/infra/ioc/providers/queries';
import {
  NotificationTypeRepositoryProviderFactory,
  UserRepositoryProviderFactory,
} from '@account/infra/ioc/providers/repositories';
import { AccountController } from '@account/presentation/controller/user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [
    UserRepositoryProviderFactory.generate(),
    NotificationTypeRepositoryProviderFactory.generate(),
    CreateUserProviderFactory.generate(),
    GetUserListProviderFactory.generate(),
    UpdateUserProviderFactory.generate(),
    DeleteUserProviderFactory.generate(),
    UpdateNotificationConsentConsumerProviderFactory.generate(),
  ],
})
export class AccountModule {}
