import {
  UserNotificationsConsentTypeormModel,
  UserTypeormModel,
} from '@common/infra/database/models';
import { BaseTypeormRepository } from '@repo/shared';
import { User } from '@users/domain/entities/user';
import { UserRepository } from '@users/domain/repositories';

import { IsNull } from 'typeorm';

export class UserTypeormRepository
  extends BaseTypeormRepository<UserTypeormModel, User>
  implements UserRepository
{
  async syncNotificationConsents(user: User): Promise<void> {
    await this.repository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.update(
          UserNotificationsConsentTypeormModel,
          {
            userId: user.id,
            deletedAt: IsNull(),
          },
          {
            deletedAt: new Date(),
          },
        );
        const userNotificationsConsents = user.notificationConsents.map(
          (item) =>
            new UserNotificationsConsentTypeormModel({
              id: item.id,
              userId: user.id,
              notificationTypeId: item.notificationTypeId,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              deletedAt: item.deletedAt,
            }),
        );
        await transactionalEntityManager.save(userNotificationsConsents);
      },
    );
  }

  // async getDetails(userId: string): Promise<User | null> {
  //   const model = await this.repository
  //     .createQueryBuilder('users')
  //     .leftJoinAndSelect(
  //       'users.userNotificationsConsents',
  //       'userNotificationsConsents',
  //     )
  //     .leftJoinAndSelect(
  //       'userNotificationsConsents.notificationType',
  //       'notificationType',
  //     )
  //     .where('users.id =:userId', { userId })
  //     .getOne();
  //   if (!model) return null;
  //   return this.mapper.modelToEntity(model);
  // }
}
