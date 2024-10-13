import { EventHandler } from '@repo/shared';
import { UserNotFoundException } from '@users/domain/exceptions';
import { UserRepository } from '@users/domain/repositories';

export class DeleteUserCommand implements DeleteUserCommand.Contract {
  constructor(
    private userRepository: UserRepository,
    private eventHandler: EventHandler,
  ) {}

  async execute(input: DeleteUserCommand.Input): DeleteUserCommand.Output {
    const user = await this.userRepository.findByParam({
      key: 'id',
      value: input.userId,
    });
    if (!user) throw new UserNotFoundException();
    await this.userRepository.softDelete(user.id);
    await this.eventHandler.send({
      eventType: 'USER_DELETED',
      queueName: 'events_fanout_exchange',
      payload: input,
    });
  }
}

export namespace DeleteUserCommand {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input = {
    userId: string;
  };
  export type Output = Promise<void>;
}
