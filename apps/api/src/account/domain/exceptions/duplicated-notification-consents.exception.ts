import { HttpCode } from 'src/shared/domain/constants/http-code';
import { Exception } from 'src/shared/domain/exceptions';

export class DuplicatedNotificationConsentsException extends Exception {
  constructor() {
    const message = 'Duplicated notification consents';
    super(HttpCode.CONFLICT, message);
    this.name = 'DuplicatedNotificationConsentsException';
  }
}
