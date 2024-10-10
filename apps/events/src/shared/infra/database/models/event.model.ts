import { BaseTypeormModel } from '@shared/infra/database/models/base.model';
import { Column, Entity, Index } from 'typeorm';

@Index('pk__events', ['id'], { unique: true })
@Entity('events', { schema: 'public' })
export class EventTypeormModel extends BaseTypeormModel {
  @Column('character varying', { name: 'event_type', length: 100 })
  eventType: string;

  @Column('jsonb', { name: 'payload' })
  payload: object;

  constructor(props: Partial<EventTypeormModel> = {}) {
    super();
    Object.assign(this, props);
  }
}
