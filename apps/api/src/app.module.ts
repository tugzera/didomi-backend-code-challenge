import { AccountModule } from '@account/account.module';
import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@repo/shared';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AccountModule,
    CommonModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
