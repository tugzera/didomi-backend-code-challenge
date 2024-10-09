import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

export const typeormConfig: DataSourceOptions = {
  database: process.env.DB_NAME,
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  migrationsRun: true,
  dropSchema: process.env.NODE_ENV === 'test' ? true : false,
  migrations: [`${__dirname}/migrations/*.{js,ts}`],
  entities: [`${__dirname}/models/*.{js,ts}`],
  logging: process.env.DB_LOGGING === 'true',
};

export const dataSource = new DataSource(typeormConfig);
