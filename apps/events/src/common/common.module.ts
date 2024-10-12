import { DatabaseConnectionProviderFactory } from '@common/infra/ioc/providers/database-connection.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [DatabaseConnectionProviderFactory.generate()],
  exports: [DatabaseConnectionProviderFactory.generate()],
})
export class CommonModule {}
