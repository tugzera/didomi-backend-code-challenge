import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpCode, HttpExceptionFilter } from '@repo/shared';

export const makeApp = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('CRUD API')
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
