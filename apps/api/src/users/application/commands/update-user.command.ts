import { EventHandler, HashGenerator } from '@repo/shared';
import {
  UserEmailAlreadyRegisteredException,
  UserNotFoundException,
} from '@users/domain/exceptions';
import { UserRepository } from '@users/domain/repositories';

export class UpdateUserCommand implements UpdateUserCommand.Contract {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
    private eventHandler: EventHandler,
  ) {}

  async execute(input: UpdateUserCommand.Input): UpdateUserCommand.Output {
    const user = await this.userRepository.findByParam({
      key: 'id',
      value: input.userId,
    });
    if (!user) throw new UserNotFoundException();
    await this.validateChangeEmail({
      currentEmail: user.email,
      desiredEmail: input.email,
    });
    const passwordHash = this.hashPassword(input.password);
    user.update({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      password: passwordHash,
      phoneNumber: input.phoneNumber,
    });
    await this.userRepository.save(user);
    await this.eventHandler.send({
      eventType: 'USER_UPDATED',
      queueName: 'events_fanout_exchange',
      payload: input,
    });
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt ? user.updatedAt.toISOString() : null,
    };
  }

  private async validateChangeEmail(input: {
    currentEmail: string;
    desiredEmail?: string;
  }) {
    const { desiredEmail, currentEmail } = input;
    if (desiredEmail && currentEmail !== desiredEmail) {
      const userAlreadyRegistered = await this.userRepository.findByParam({
        key: 'email',
        value: desiredEmail,
      });
      if (userAlreadyRegistered)
        throw new UserEmailAlreadyRegisteredException();
    }
  }

  private hashPassword(password?: string) {
    return password ? this.hashGenerator.hash(password) : undefined;
  }
}

export namespace UpdateUserCommand {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input = {
    userId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
  };
  export type Output = Promise<Response>;
  type Response = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string | null;
  };
}
