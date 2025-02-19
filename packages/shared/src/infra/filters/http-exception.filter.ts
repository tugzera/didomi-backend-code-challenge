import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { Exception, HttpCode } from '../../domain';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof Exception) {
      response.status(exception.code).json({
        error: exception.message,
        code: exception.name,
      });
    } else if (exception instanceof HttpException) {
      if (exception.getStatus() === HttpCode.UNPROCESSABLE_ENTITY) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { message } = exception.getResponse() as any;
        response.status(exception.getStatus()).json({
          error: this.filterDtoValidation(message),
          code: exception.name,
        });
        return;
      }
      response.status(exception.getStatus()).json({
        error: exception.message,
        code: exception.name,
      });
    } else {
      this.logger.error(exception);
      response.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        error:
          process.env.NODE_ENV === 'prod'
            ? HttpCode.INTERNAL_SERVER_ERROR
            : exception?.stack,
        code: exception?.name,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private filterDtoValidation(errors: string[]): any {
    if (Array.isArray(errors)) {
      const obj = {};
      errors.forEach((error) => {
        const [key] = error.split(' ');
        const message = error.replace(`${key} `, '');
        const content = obj[key] || [];
        content.push(message);
        obj[key] = content;
      });
      return obj;
    }
  }
}
