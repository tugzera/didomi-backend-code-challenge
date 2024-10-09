import { Module } from '@nestjs/common';
import { CreateUserProviderFactory } from './infra/ioc/providers/commands/create-user.provider';
import { DeleteUserProviderFactory } from './infra/ioc/providers/commands/delete-user.provider';
import { UpdateUserProviderFactory } from './infra/ioc/providers/commands/update-user.provider';
import { GetUserListProviderFactory } from './infra/ioc/providers/queries/get-user-list.provider';
import { UserRepositoryProviderFactory } from './infra/ioc/providers/repositories/user-repository.provider';
import { AccountController } from './presentation/controller/user.controller';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [
    UserRepositoryProviderFactory.generate(),
    CreateUserProviderFactory.generate(),
    GetUserListProviderFactory.generate(),
    UpdateUserProviderFactory.generate(),
    DeleteUserProviderFactory.generate(),
  ],
})
export class AccountModule {}
