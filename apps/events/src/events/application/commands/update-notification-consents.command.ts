import { EventHandler } from '@shared/domain/contracts';

export class UpdateNotificationConsentsCommand
  implements UpdateNotificationConsentsCommand.Contract
{
  constructor(private eventHandler: EventHandler) {}

  async execute(
    input: UpdateNotificationConsentsCommand.Input,
  ): UpdateNotificationConsentsCommand.Output {
    await this.eventHandler.send({
      eventType: 'NOTIFICATION_CONSENTS_UPDATED',
      queueName: 'events_queue',
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
