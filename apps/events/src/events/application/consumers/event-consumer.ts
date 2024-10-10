import { Event } from '@events/domain/entities';
import { EventRepository } from '@events/domain/repositories';

export class EventConsumer implements EventConsumer.Contract {
  constructor(private eventRepository: EventRepository) {}

  async execute(input: EventConsumer.Input): EventConsumer.Output {
    const event = Event.create({
      eventType: input.eventType,
      payload: input.payload,
    });
    console.log('HERE', event);
    await this.eventRepository.save(event);
  }
}

export namespace EventConsumer {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input<T = any> = {
    eventType: string;
    payload: T;
  };
  export type Output = Promise<void>;
}
