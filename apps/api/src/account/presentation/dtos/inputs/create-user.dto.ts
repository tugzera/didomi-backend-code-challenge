import {
  EmailDecorator,
  FirstNameDecorator,
  LastNameDecorator,
  PasswordDecorator,
  PhoneNumberDecorator,
} from '@repo/shared';

export class CreateUserDto {
  @FirstNameDecorator()
  firstName: string;

  @LastNameDecorator()
  lastName: string;

  @EmailDecorator()
  email: string;

  @PasswordDecorator()
  password: string;

  @PhoneNumberDecorator(false)
  phoneNumber?: string;
}
