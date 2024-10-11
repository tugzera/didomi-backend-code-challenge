import { NotificationType } from '@account/domain/entities';
import { NotificationTypeRepository } from '@account/domain/repositories';
import { NotificationTypeTypeormModel } from '@shared/infra/database/models';
import { BaseTypeormRepository } from '@shared/infra/database/repositories/base-typeorm.repository';

export class NotificationTypeTypeormRepository
  extends BaseTypeormRepository<NotificationTypeTypeormModel, NotificationType>
  implements NotificationTypeRepository
{
  async findAllyBySlug(slugs: string[]): Promise<NotificationType[]> {
    if (slugs.length === 0) return [];
    const models = await this.repository
      .createQueryBuilder('notificationTypes')
      .where('notificationTypes.slug IN (:...slugs)', { slugs })
      .getMany();
    return models.map((model) => this.mapper.modelToEntity(model));
  }

  async getAll(): Promise<NotificationType[]> {
    const models = await this.repository.find();
    return models.map((model) => this.mapper.modelToEntity(model));
  }
}
