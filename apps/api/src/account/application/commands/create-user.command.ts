import { User } from '@account/domain/entities/user';
import { UserEmailAlreadyRegisteredException } from '@account/domain/exceptions';
import { UserRepository } from '@account/domain/repositories';
import { HashGenerator } from '@shared/domain/contracts';

export class CreateUserCommand implements CreateUserCommand.Contract {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(input: CreateUserCommand.Input): CreateUserCommand.Output {
    const passwordHash = this.hashGenerator.hash(input.password);
    const userAlreadyRegistered = await this.userRepository.findByParam({
      key: 'email',
      value: input.email,
    });
    if (userAlreadyRegistered) throw new UserEmailAlreadyRegisteredException();
    const user = User.create({
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
    };
  }
}

export namespace CreateUserCommand {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  export type Output = Promise<Response>;
  type Response = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
