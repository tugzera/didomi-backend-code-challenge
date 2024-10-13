import { NotificationTypeTypeormModel } from '@common/infra/database/models';
import { BaseTypeormRepository } from '@repo/shared';
import { NotificationType } from '@users/domain/entities';
import { NotificationTypeRepository } from '@users/domain/repositories';

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

  // async getAll(): Promise<NotificationType[]> {
  //   const models = await this.repository.find();
  //   return models.map((model) => this.mapper.modelToEntity(model));
  // }
}
