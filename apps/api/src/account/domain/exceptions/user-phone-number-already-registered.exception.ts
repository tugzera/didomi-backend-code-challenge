import { HttpCode } from 'src/shared/domain/constants/http-code';
import { Exception } from 'src/shared/domain/exceptions';

export class UserPhoneNumberAlreadyRegisteredException extends Exception {
  constructor() {
    const message = 'User with provided phone number is already registered';
    super(HttpCode.CONFLICT, message);
    this.name = 'UserPhoneNumberAlreadyRegisteredException';
  }
}
