import { HttpCode } from 'src/shared/domain/constants/http-code';
import { Exception } from 'src/shared/domain/exceptions';

export class UserNotFoundException extends Exception {
  constructor() {
    const message = 'User not found exception';
    super(HttpCode.NOT_FOUND, message);
    this.name = 'UserNotFoundException';
  }
}
