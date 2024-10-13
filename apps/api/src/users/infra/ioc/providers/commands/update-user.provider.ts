import { Provider } from '@nestjs/common';
import { EventHandler, HashGenerator, SharedProvider } from '@repo/shared';
import { UpdateUserCommand } from '@users/application/commands';
import { UserRepository } from '@users/domain/repositories';
import { AccountProvider } from '../../account-provider';

export class UpdateUserProviderFactory {
  static generate(): Provider {
    return {
      provide: AccountProvider.COMMANDS.UPDATE_USER,
      useFactory: (
        userRepository: UserRepository,
        hashGenerator: HashGenerator,
        eventHandler: EventHandler,
      ): UpdateUserCommand.Contract => {
        return new UpdateUserCommand(
          userRepository,
          hashGenerator,
          eventHandler,
        );
      },
      inject: [
        AccountProvider.REPOSITORIES.USER_REPOSITORY,
        SharedProvider.HASH_GENERATOR,
        SharedProvider.EVENT_HANDLER,
      ],
    };
  }
}
