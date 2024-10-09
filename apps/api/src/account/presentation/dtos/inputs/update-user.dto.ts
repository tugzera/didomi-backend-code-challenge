import {
  EmailDecorator,
  FirstNameDecorator,
  LastNameDecorator,
  PasswordDecorator,
  PhoneNumberDecorator,
} from '@shared/presentation/decorators';

export class UpdateUserDto {
  @FirstNameDecorator(false)
  firstName?: string;

  @LastNameDecorator(false)
  lastName?: string;

  @EmailDecorator(false)
  email?: string;

  @PasswordDecorator(false)
  password?: string;

  @PhoneNumberDecorator(false)
  phoneNumber?: string;
}
