import { Provider } from '@nestjs/common';
import { EventHandler, HashGenerator, SharedProvider } from '@repo/shared';
import { CreateUserCommand } from '@users/application/commands';
import { UserRepository } from '@users/domain/repositories';
import { AccountProvider } from '@users/infra/ioc/account-provider';

export class CreateUserProviderFactory {
  static generate(): Provider {
    return {
      provide: AccountProvider.COMMANDS.CREATE_USER,
      useFactory: (
        userRepository: UserRepository,
        hashGenerator: HashGenerator,
        eventHandler: EventHandler,
      ): CreateUserCommand.Contract => {
        return new CreateUserCommand(
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
