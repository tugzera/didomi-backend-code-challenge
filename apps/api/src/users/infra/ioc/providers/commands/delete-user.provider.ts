import { Provider } from '@nestjs/common';
import { EventHandler, SharedProvider } from '@repo/shared';
import { DeleteUserCommand } from '@users/application/commands/delete-user.command';
import { UserRepository } from '@users/domain/repositories';
import { AccountProvider } from '@users/infra/ioc/account-provider';

export class DeleteUserProviderFactory {
  static generate(): Provider {
    return {
      provide: AccountProvider.COMMANDS.DELETE_USER,
      useFactory: (
        userRepository: UserRepository,
        eventHandler: EventHandler,
      ): DeleteUserCommand.Contract => {
        return new DeleteUserCommand(userRepository, eventHandler);
      },
      inject: [
        AccountProvider.REPOSITORIES.USER_REPOSITORY,
        SharedProvider.EVENT_HANDLER,
      ],
    };
  }
}
