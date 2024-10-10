import { BaseEntity } from '@shared/domain/entities';

export class Event extends BaseEntity {
  eventType: string;
  payload: object;

  constructor(props: Partial<Event> = {}) {
    super(props);
    Object.assign(this, props);
  }

  static create(props: { eventType: string; payload: object }): Event {
    return new Event({
      eventType: props.eventType,
      payload: props.payload,
    });
  }
}
