import { UserTypeormModel } from '@common/infra/database/models';
import { BaseMapper } from '@repo/shared';
import { User } from '@users/domain/entities';

export class UserTypeormMapper implements BaseMapper<User, UserTypeormModel> {
  entityToModel(domain: User): UserTypeormModel {
    return new UserTypeormModel({
      id: domain.id,
      email: domain.email,
      firstName: domain.firstName,
      lastName: domain.lastName,
      passwordHash: domain.password,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt,
    });
  }

  modelToEntity(model: UserTypeormModel): User {
    const user = new User({
      id: model.id,
      alternativeId: model.alternativeId,
      email: model.email,
      firstName: model.firstName,
      lastName: model.lastName,
      password: model.passwordHash,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
    // if (model?.userNotificationsConsents?.length) {
    //   const notificationConsents = model.userNotificationsConsents.map(
    //     (consent) =>
    //       new NotificationConsent({
    //         id: consent.id,
    //         alternativeId: consent.alternativeId,
    //         userId: consent.user.id,
    //         notificationTypeId: consent.notificationType.id,
    //         slug: consent.notificationType.slug,
    //         createdAt: consent.createdAt,
    //         updatedAt: consent.updatedAt,
    //         deletedAt: consent.deletedAt,
    //       }),
    //   );
    //   user.notificationConsents = notificationConsents;
    // }
    return user;
  }
}
