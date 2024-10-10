import { Event } from '@events/domain/entities';
import { BaseRepository } from '@shared/domain/repositories';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EventRepository extends BaseRepository<Event> {}
