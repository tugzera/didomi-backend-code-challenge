import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpCode } from '@shared/domain/constants';
import { HttpExceptionFilter } from './shared/infra/filters/http-exception.filter';

export const makeApp = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('EVENTS API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      always: true,
      forbidUnknownValues: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      errorHttpStatusCode: HttpCode.UNPROCESSABLE_ENTITY as any,
    }),
  );
  app.enableCors({ origin: '*' });
  app.useGlobalFilters(new HttpExceptionFilter());
};
