import { typeormConfig } from '@common/infra/database/config';
import { TypeormDatabaseConnection } from '@common/infra/database/typeorm-database-connection.adapter';
import { CommonProvider } from '@common/infra/ioc/common.provider';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

export class DatabaseConnectionProviderFactory {
  static generate(): Provider {
    return {
      provide: CommonProvider.DATABASE_CONNECTION,
      useFactory: async (): Promise<DataSource> => {
        const dbConnection =
          TypeormDatabaseConnection.getInstance(typeormConfig);
        await dbConnection.connect();
        return dbConnection.getConnection();
      },
      inject: [],
    };
  }
}
