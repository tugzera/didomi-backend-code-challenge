import { BaseRepository } from '@repo/shared';
import { User } from '@users/domain/entities';

export interface UserRepository extends BaseRepository<User> {
  // getDetails(userId: string): Promise<User | null>;
  syncNotificationConsents(user: User): Promise<void>;
}
