import { Exception, HttpCode } from '@repo/shared';

export class UserNotAllowedException extends Exception {
  constructor() {
    const message = 'User not allowed exception';
    super(HttpCode.FORBIDDEN, message);
    this.name = 'UserNotAllowedException';
  }
}
