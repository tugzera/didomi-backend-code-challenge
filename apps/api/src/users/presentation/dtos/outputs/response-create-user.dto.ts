import {
  EmailDecorator,
  FirstNameDecorator,
  LastNameDecorator,
  PhoneNumberDecorator,
  UuidDecorator,
} from '@repo/shared';

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
