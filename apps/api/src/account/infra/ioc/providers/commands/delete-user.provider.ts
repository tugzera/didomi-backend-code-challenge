import { DeleteUserCommand } from '@account/application/commands/delete-user.command';
import { UserRepository } from '@account/domain/repositories';
import { AccountProvider } from '@account/infra/ioc/account-provider';
import { Provider } from '@nestjs/common';
import { EventHandler, SharedProvider } from '@repo/shared';

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
