import { Exception, HttpCode } from '@repo/shared';

export class UserPhoneNumberAlreadyRegisteredException extends Exception {
  constructor() {
    const message = 'User with provided phone number is already registered';
    super(HttpCode.CONFLICT, message);
    this.name = 'UserPhoneNumberAlreadyRegisteredException';
  }
}
