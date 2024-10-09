import { BaseRepository } from '@shared/domain/repositories';
import { User } from '../entities/user';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UserRepository extends BaseRepository<User> {}
