import { typeormConfig } from '@common/infra/database/config';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { SharedProvider, TypeormDatabaseConnection } from '@repo/shared';
import { makeApp } from '@src/app.factory';
import { AppModule } from '@src/app.module';
import { eventHandlerMock } from '@test/mocks';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({ path: '.env.test' });

const setup = async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(SharedProvider.EVENT_HANDLER)
    .useValue(eventHandlerMock)
    .compile();
  const app = moduleRef.createNestApplication();
  makeApp(app);
  await app.init();
  const connection = TypeormDatabaseConnection.getInstance(typeormConfig);
  await connection.connect();
  return {
    app,
    databaseConnection: connection,
  };
};

export let app: INestApplication;
export let databaseConnection: DataSource;

global.beforeAll(async () => {
  const { app: appSetup, databaseConnection: databaseConnectionSetup } =
    await setup();
  app = appSetup;
  databaseConnection = databaseConnectionSetup.getConnection();
});

global.afterAll(async () => {
  await app.close();
  await databaseConnection.destroy();
});
