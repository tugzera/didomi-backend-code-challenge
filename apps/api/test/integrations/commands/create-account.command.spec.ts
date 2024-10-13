import { EventHandler, HashGenerator } from '@repo/shared';
import { CreateUserCommand } from '@users/application/commands';
import { User } from '@users/domain/entities';
import { UserPhoneNumberAlreadyRegisteredException } from '@users/domain/exceptions';
import { UserRepository } from '@users/domain/repositories';
import { mock, MockProxy } from 'jest-mock-extended';

describe('CreateAccountCommand', () => {
  let sut: CreateUserCommand;
  let userRepository: MockProxy<UserRepository>;
  let hashGenerator: MockProxy<HashGenerator>;
  let eventHandler: MockProxy<EventHandler>;

  beforeAll(() => {
    userRepository = mock<UserRepository>();
    hashGenerator = mock<HashGenerator>();
    eventHandler = mock<EventHandler>();
    sut = new CreateUserCommand(userRepository, hashGenerator, eventHandler);
  });

  it('should throw UserPhoneNumberAlreadyRegisteredException if provided phone number is already in use', async () => {
    userRepository.findByParam.mockResolvedValueOnce(null);
    userRepository.findByParam.mockResolvedValueOnce(new User());
    await expect(
      sut.execute({
        email: 'test@test.com',
        firstName: 'Test',
        lastName: '',
        password: '.Senha123',
        phoneNumber: '+551199999999',
      }),
    ).rejects.toThrow(new UserPhoneNumberAlreadyRegisteredException());
  });
});
