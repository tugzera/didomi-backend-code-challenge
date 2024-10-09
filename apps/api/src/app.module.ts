import { AccountModule } from '@account/account.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AccountModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
