import { DeleteUserCommand } from '@account/application/commands/delete-user.command';
import { UserRepository } from '@account/domain/repositories';
import { Provider } from '@nestjs/common';
import { AccountProvider } from '../../account-provider';

export class DeleteUserProviderFactory {
  static generate(): Provider {
    return {
      provide: AccountProvider.COMMANDS.DELETE_USER,
      useFactory: (
        userRepository: UserRepository,
      ): DeleteUserCommand.Contract => {
        return new DeleteUserCommand(userRepository);
      },
      inject: [AccountProvider.REPOSITORIES.USER_REPOSITORY],
    };
  }
}
