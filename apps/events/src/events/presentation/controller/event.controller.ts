import { UpdateNotificationConsentsCommand } from '@events/application/commands';
import { EventProvider } from '@events/infra/ioc/event-provider';
import { UpdateNotificationConsentsDto } from '@events/presentation/dtos/inputs';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(
    @Inject(EventProvider.COMMANDS.UPDATE_NOTIFICATION_CONSENTS)
    private updateNotificationConsentsCommand: UpdateNotificationConsentsCommand.Contract,
  ) {}

  @Post()
  async handleUpdateNotificationConsents(
    @Body() dto: UpdateNotificationConsentsDto,
  ): Promise<void> {
    await this.updateNotificationConsentsCommand.execute(dto);
  }
}
