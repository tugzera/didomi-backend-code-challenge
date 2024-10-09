import { UserNotFoundException } from '@account/domain/exceptions';
import { UserRepository } from '@account/domain/repositories';

export class DeleteUserCommand implements DeleteUserCommand.Contract {
  constructor(private userRepository: UserRepository) {}

  async execute(input: DeleteUserCommand.Input): DeleteUserCommand.Output {
    const user = await this.userRepository.findByParam({
      key: 'id',
      value: input.userId,
    });
    if (!user) throw new UserNotFoundException();
    await this.userRepository.softDelete(user.id);
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
