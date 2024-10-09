import {
  EmailDecorator,
  FirstNameDecorator,
  LastNameDecorator,
  PhoneNumberDecorator,
} from '@shared/presentation/decorators';
import { PasswordDecorator } from '../../../../shared/presentation/decorators/password.decorator';

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
