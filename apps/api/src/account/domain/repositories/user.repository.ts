import { User } from '@account/domain/entities';
import { BaseRepository } from '@repo/shared';

export interface UserRepository extends BaseRepository<User> {
  getDetails(userId: string): Promise<User | null>;
  syncNotificationConsents(user: User): Promise<void>;
}
