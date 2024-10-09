import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpCode } from '@shared/domain/constants';
import { Exception } from '@shared/domain/exceptions';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger();

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
