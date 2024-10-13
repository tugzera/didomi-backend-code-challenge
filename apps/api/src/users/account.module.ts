import { Module } from '@nestjs/common';
import {
  CreateUserProviderFactory,
  DeleteUserProviderFactory,
  UpdateUserProviderFactory,
} from '@users/infra/ioc/providers/commands';
import { UpdateNotificationConsentConsumerProviderFactory } from '@users/infra/ioc/providers/consumers';
import {
  GetUserDetailsQueryProviderFactory,
  GetUserListProviderFactory,
} from '@users/infra/ioc/providers/queries';
import {
  NotificationTypeRepositoryProviderFactory,
  UserRepositoryProviderFactory,
} from '@users/infra/ioc/providers/repositories';
import { UserController } from '@users/presentation/controller/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserRepositoryProviderFactory.generate(),
    NotificationTypeRepositoryProviderFactory.generate(),
    CreateUserProviderFactory.generate(),
    GetUserListProviderFactory.generate(),
    GetUserDetailsQueryProviderFactory.generate(),
    UpdateUserProviderFactory.generate(),
    DeleteUserProviderFactory.generate(),
    UpdateNotificationConsentConsumerProviderFactory.generate(),
  ],
})
export class UserModule {}
