import { DatabaseConnection } from '@shared/domain/contracts';
import { DataSource, DataSourceOptions } from 'typeorm';

export class TypeormDatabaseConnection
  implements DatabaseConnection<DataSource>
{
  private static instance: TypeormDatabaseConnection | null = null;
  private connection: DataSource;
  private config: DataSourceOptions;

  private constructor(props: { config: DataSourceOptions }) {
    this.config = props.config;
    this.connection = new DataSource(this.config);
  }

  getConnection(): DataSource {
    return this.connection;
  }

  public static getInstance(
    config: DataSourceOptions,
  ): TypeormDatabaseConnection {
    if (!TypeormDatabaseConnection.instance) {
      TypeormDatabaseConnection.instance = new TypeormDatabaseConnection({
        config,
      });
    }
    return TypeormDatabaseConnection.instance;
  }

  public async connect(): Promise<DataSource> {
    if (!this.connection.isInitialized) {
      await this.connection.initialize();
    }
    return this.connection;
  }

  public async disconnect(): Promise<void> {
    if (this.connection.isInitialized) {
      await this.connection.destroy();
    }
  }
}
