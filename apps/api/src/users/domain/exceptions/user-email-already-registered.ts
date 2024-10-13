import { Exception, HttpCode } from '@repo/shared';

export class UserEmailAlreadyRegisteredException extends Exception {
  constructor() {
    const message = 'User with provided email already registered';
    super(HttpCode.CONFLICT, message);
    this.name = 'UserEmailAlreadyRegisteredException';
  }
}
