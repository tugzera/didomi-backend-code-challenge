import { HttpCode } from 'src/shared/domain/constants/http-code';
import { Exception } from 'src/shared/domain/exceptions';

export class NotificationTypeNotFoundException extends Exception {
  constructor() {
    const message = 'Notification type was not found';
    super(HttpCode.CONFLICT, message);
    this.name = 'NotificationTypeNotFoundException';
  }
}
