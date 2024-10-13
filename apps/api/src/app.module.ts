import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@repo/shared';
import { UserModule } from '@users/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    CommonModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
