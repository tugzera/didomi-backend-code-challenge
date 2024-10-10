import { DeleteUserCommand } from '@account/application/commands/delete-user.command';
import { UserRepository } from '@account/domain/repositories';
import { Provider } from '@nestjs/common';
import { EventHandler } from '@shared/domain/contracts';
import { SharedProvider } from '@shared/infra/ioc/shared-provider';
import { AccountProvider } from '../../account-provider';

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
