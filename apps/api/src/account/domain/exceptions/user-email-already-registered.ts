import { HttpCode } from 'src/shared/domain/constants/http-code';
import { Exception } from 'src/shared/domain/exceptions';

export class UserEmailAlreadyRegisteredException extends Exception {
  constructor() {
    const message = 'User with provided email already registered';
    super(HttpCode.CONFLICT, message);
    this.name = 'UserEmailAlreadyRegisteredException';
  }
}
