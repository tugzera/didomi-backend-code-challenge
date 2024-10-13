import { Exception, HttpCode } from '@repo/shared';

export class NotificationTypeNotFoundException extends Exception {
  constructor() {
    const message = 'Notification type was not found';
    super(HttpCode.CONFLICT, message);
    this.name = 'NotificationTypeNotFoundException';
  }
}
