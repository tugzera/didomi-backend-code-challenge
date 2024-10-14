import { CommonModule } from '@common/common.module';
import { EventModule } from '@events/event.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@repo/shared';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }),
    EventModule,
    CommonModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
