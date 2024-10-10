import { BaseEntity } from '@shared/domain/entities';

export class Event extends BaseEntity {
  eventType: string;
  payload: object;

  constructor(props: Partial<Event> = {}) {
    super(props);
    Object.assign(this, props);
  }
}
