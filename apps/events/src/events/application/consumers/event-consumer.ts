import { Event } from '@events/domain/entities';
import { EventRepository } from '@events/domain/repositories';

export class EventConsumer implements EventConsumer.Contract {
  constructor(private eventRepository: EventRepository) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(input: EventConsumer.Input<any>): EventConsumer.Output {
    const event = Event.create({
      eventType: input.eventType,
      payload: input.payload,
    });
    await this.eventRepository.save(event);
  }
}

export namespace EventConsumer {
  export interface Contract {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    execute(input: Input<any>): Output;
  }
  export type Input<T> = {
    eventType: string;
    payload: T;
  };
  export type Output = Promise<void>;
}
