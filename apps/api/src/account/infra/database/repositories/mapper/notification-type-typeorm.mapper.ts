import { NotificationType } from '@account/domain/entities';
import { NotificationTypeTypeormModel } from '@common/infra/database/models';
import { BaseMapper } from '@repo/shared';

export class NotificationTypeTypeormMapper
  implements BaseMapper<NotificationType, NotificationTypeTypeormModel>
{
  entityToModel(domain: NotificationType): NotificationTypeTypeormModel {
    return new NotificationTypeTypeormModel({
      id: domain.id,
      name: domain.name,
      slug: domain.slug,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt,
    });
  }

  modelToEntity(model: NotificationTypeTypeormModel): NotificationType {
    return new NotificationType({
      id: model.id,
      alternativeId: model.alternativeId,
      name: model.name,
      slug: model.slug,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
