import { NestFactory } from '@nestjs/core';
import { makeApp } from './app.factory';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  makeApp(app);
  await app.listen(3000);
}
bootstrap();
