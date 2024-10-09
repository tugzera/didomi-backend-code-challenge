import { CreateUserCommand } from '@account/application/commands';
import { UserRepository } from '@account/domain/repositories';
import { Provider } from '@nestjs/common';
import { HashGenerator } from '@shared/domain/contracts';
import { SharedProvider } from '@shared/infra/ioc/shared-provider';
import { AccountProvider } from '../../account-provider';

export class CreateUserProviderFactory {
  static generate(): Provider {
    return {
      provide: AccountProvider.COMMANDS.CREATE_USER,
      useFactory: (
        userRepository: UserRepository,
        hashGenerator: HashGenerator,
      ): CreateUserCommand.Contract => {
        return new CreateUserCommand(userRepository, hashGenerator);
      },
      inject: [
        AccountProvider.REPOSITORIES.USER_REPOSITORY,
        SharedProvider.HASH_GENERATOR,
      ],
    };
  }
}
