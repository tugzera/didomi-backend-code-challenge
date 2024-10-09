import { HttpCode } from 'src/shared/domain/constants/http-code';
import { Exception } from 'src/shared/domain/exceptions';

export class UserNotAllowedException extends Exception {
  constructor() {
    const message = 'User not allowed exception';
    super(HttpCode.FORBIDDEN, message);
    this.name = 'UserNotAllowedException';
  }
}
