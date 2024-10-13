import { Exception, HttpCode } from '@repo/shared';

export class DuplicatedNotificationConsentsException extends Exception {
  constructor() {
    const message = 'Duplicated notification consents';
    super(HttpCode.CONFLICT, message);
    this.name = 'DuplicatedNotificationConsentsException';
  }
}
