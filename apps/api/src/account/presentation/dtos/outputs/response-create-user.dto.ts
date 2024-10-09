import {
  EmailDecorator,
  FirstNameDecorator,
  LastNameDecorator,
  PhoneNumberDecorator,
  UuidDecorator,
} from '@shared/presentation/decorators';

export class ResponseCreateUserDto {
  @UuidDecorator()
  id: string;

  @FirstNameDecorator()
  firstName: string;

  @LastNameDecorator()
  lastName: string;

  @EmailDecorator()
  email: string;

  @PhoneNumberDecorator()
  phoneNumber?: string;
}
