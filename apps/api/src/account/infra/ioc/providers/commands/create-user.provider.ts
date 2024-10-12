import { CreateUserCommand } from '@account/application/commands';
import { UserRepository } from '@account/domain/repositories';
import { AccountProvider } from '@account/infra/ioc/account-provider';
import { Provider } from '@nestjs/common';
import { EventHandler, HashGenerator, SharedProvider } from '@repo/shared';

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
