import {
  UserEmailAlreadyRegisteredException,
  UserNotFoundException,
} from '@account/domain/exceptions';
import { UserRepository } from '@account/domain/repositories';
import { HashGenerator } from '@shared/domain/contracts';

export class UpdateUserCommand implements UpdateUserCommand.Contract {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
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
    });
    await this.userRepository.save(user);
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
