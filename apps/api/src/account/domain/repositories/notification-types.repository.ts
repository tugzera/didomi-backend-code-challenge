import { NotificationType } from '@account/domain/entities';
import { BaseRepository } from '@shared/domain/repositories';

export interface NotificationTypeRepository
  extends BaseRepository<NotificationType> {
  getAll(): Promise<NotificationType[]>;
  findAllyBySlug(slugs: string[]): Promise<NotificationType[]>;
}
