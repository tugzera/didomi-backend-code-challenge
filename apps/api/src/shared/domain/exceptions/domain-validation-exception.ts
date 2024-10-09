import { HttpCode } from '../constants';
import { Exception } from './exception';

export class DomainValidationException extends Exception {
  constructor(message: string) {
    super(HttpCode.UNPROCESSABLE_ENTITY, message);
    this.name = 'DomainValidationException';
  }
}
