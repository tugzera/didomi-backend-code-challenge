import { BaseRepository } from '@repo/shared';
import { NotificationType } from '@users/domain/entities';

export interface NotificationTypeRepository
  extends BaseRepository<NotificationType> {
  findAllyBySlug(slugs: string[]): Promise<NotificationType[]>;
}
