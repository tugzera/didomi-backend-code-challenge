import { HttpCode } from '../constants';

export class Exception extends Error {
  code: number;
  message: string;

  constructor(code: HttpCode, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}
