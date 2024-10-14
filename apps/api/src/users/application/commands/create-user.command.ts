import { EventHandler, Events, HashGenerator } from '@repo/shared';
import { User } from '@users/domain/entities';
import {
  UserEmailAlreadyRegisteredException,
  UserPhoneNumberAlreadyRegisteredException,
} from '@users/domain/exceptions';
import { UserRepository } from '@users/domain/repositories';

export class CreateUserCommand implements CreateUserCommand.Contract {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
    private eventHandler: EventHandler,
  ) {}

  async execute(input: CreateUserCommand.Input): CreateUserCommand.Output {
    const passwordHash = this.hashGenerator.hash(input.password);
    await this.validateUniqueFields({
      email: input.email,
      phoneNumber: input.phoneNumber,
    });
    const user = User.create({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      password: passwordHash,
      phoneNumber: input.phoneNumber,
    });
    await this.userRepository.save(user);
    await this.eventHandler.send<Events.UserCreatedEventInput>({
      eventType: Events.Type.USER_CREATED,
      payload: {
        id: user.id,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        password: passwordHash,
        phoneNumber: input.phoneNumber,
      },
      queueName: Events.Exchanges.FAN_OUT,
    });
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      consents: [],
    };
  }

  private async validateUniqueFields(input: {
    email: string;
    phoneNumber?: string;
  }) {
    const userAlreadyRegistered = await this.userRepository.findByParam({
      key: 'email',
      value: input.email,
    });
    if (userAlreadyRegistered) throw new UserEmailAlreadyRegisteredException();
    if (input.phoneNumber) {
      const phoneNumberAlreadyRegistered =
        await this.userRepository.findByParam({
          key: 'phoneNumber',
          value: input.phoneNumber,
        });
      if (phoneNumberAlreadyRegistered)
        throw new UserPhoneNumberAlreadyRegisteredException();
    }
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
    phoneNumber?: string;
  };
  type Consent = {
    id: string;
    enabled: boolean;
  };
  type Response = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    consents: Consent[];
  };
  export type Output = Promise<Response>;
}
