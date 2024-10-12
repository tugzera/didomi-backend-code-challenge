import { Event } from '@events/domain/entities';
import { EventRepository } from '@events/domain/repositories';
import { EventHandler } from '@repo/shared';

export class UpdateNotificationConsentsCommand
  implements UpdateNotificationConsentsCommand.Contract
{
  constructor(
    private eventRepository: EventRepository,
    private eventHandler: EventHandler,
  ) {}

  async execute(
    input: UpdateNotificationConsentsCommand.Input,
  ): UpdateNotificationConsentsCommand.Output {
    const event = Event.create({
      eventType: 'NOTIFICATION_CONSENTS_UPDATED',
      payload: input,
    });
    await this.eventRepository.save(event);
    await this.eventHandler.send({
      eventType: 'NOTIFICATION_CONSENTS_UPDATED',
      queueName: 'crud_api_topic_exchange',
      routingKey: `consents.${'NOTIFICATION_CONSENTS_UPDATED'}`,
      payload: input,
    });
  }
}

export namespace UpdateNotificationConsentsCommand {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input = {
    user: {
      id: string;
    };
    consents: Consents[];
  };
  type Consents = {
    id: string;
    enabled: boolean;
  };
  export type Output = Promise<void>;
}
