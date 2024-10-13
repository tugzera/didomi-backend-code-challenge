import { UserCreatedEvent, UserDeletedEvent, UserUpdatedEvent } from './types';

export namespace Events {
  export enum Type {
    USER_CREATED = 'USER_CREATED',
    USER_UPDATED = 'USER_UPDATED',
    USER_DELETED = 'USER_DELETED',
    NOTIFICATION_CONSENTS_UPDATED = 'NOTIFICATION_CONSENTS_UPDATED',
  }
  export enum Queue {
    FAN_OUT = 'events_fanout_exchange',
    CRUD_API = 'crud_api_topic_exchange',
  }
  export type UserCreatedEventInput = UserCreatedEvent;
  export type UserUpdatedEventInput = UserUpdatedEvent;
  export type UserDeletedEventInput = UserDeletedEvent;
}
