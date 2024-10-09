import { Provider } from '@nestjs/common';
import { typeormConfig } from '@shared/infra/database/config';
import { TypeormDatabaseConnection } from '@shared/infra/database/typeorm-database-connection.adapter';
import { DataSource } from 'typeorm';
import { SharedProvider } from '../shared-provider';

export class DatabaseConnectionProviderFactory {
  static generate(): Provider {
    return {
      provide: SharedProvider.DATABASE_CONNECTION,
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
