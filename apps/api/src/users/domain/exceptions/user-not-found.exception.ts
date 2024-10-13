import { Exception, HttpCode } from '@repo/shared';
export class UserNotFoundException extends Exception {
  constructor() {
    const message = 'User not found exception';
    super(HttpCode.NOT_FOUND, message);
    this.name = 'UserNotFoundException';
  }
}
