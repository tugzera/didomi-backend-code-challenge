import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { typeormConfig } from '@shared/infra/database/config';
import { TypeormDatabaseConnection } from '@shared/infra/database/typeorm-database-connection.adapter';
import { makeApp } from '@src/app.factory';
import { AppModule } from '@src/app.module';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({
  path: '.env.test',
});

const setup = async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
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
