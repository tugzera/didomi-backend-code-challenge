import { UpdateUserCommand } from '@account/application/commands';
import { Provider } from '@nestjs/common';
import { EventHandler } from '@shared/domain/contracts';
import { HashGenerator } from '../../../../../shared/domain/contracts/hash-generator';
import { SharedProvider } from '../../../../../shared/infra/ioc/shared-provider';
import { UserRepository } from '../../../../domain/repositories';
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
