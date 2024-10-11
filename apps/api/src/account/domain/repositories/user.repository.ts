import { BaseRepository } from '@shared/domain/repositories';
import { User } from '../entities/user';

export interface UserRepository extends BaseRepository<User> {
  getDetails(userId: string): Promise<User | null>;
  syncNotificationConsents(user: User): Promise<void>;
}
