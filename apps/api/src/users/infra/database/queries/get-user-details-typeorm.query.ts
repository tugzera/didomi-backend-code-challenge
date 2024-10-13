import {
  NotificationTypeTypeormModel,
  UserTypeormModel,
} from '@common/infra/database/models';
import { GetUserDetailsQuery } from '@users/application/queries';
import { UserNotFoundException } from '@users/domain/exceptions';
import { DataSource } from 'typeorm';

export class GetUserDetailsTypeormQuery
  implements GetUserDetailsQuery.Contract
{
  constructor(private connection: DataSource) {}
  async execute({
    userId,
  }: GetUserDetailsQuery.Input): GetUserDetailsQuery.Output {
    const repository = this.connection.getRepository(UserTypeormModel);
    const notificationTypesRepository = this.connection.getRepository(
      NotificationTypeTypeormModel,
    );
    const notificationTypes = await notificationTypesRepository.find();
    const model = await repository
      .createQueryBuilder('users')
      .leftJoinAndSelect(
        'users.userNotificationsConsents',
        'userNotificationsConsents',
      )
      .leftJoinAndSelect(
        'userNotificationsConsents.notificationType',
        'notificationType',
      )
      .where('users.id =:userId', { userId })
      .getOne();
    if (!model) throw new UserNotFoundException();
    return {
      id: model.id,
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
      consents: notificationTypes.map((notificationType) => ({
        id: notificationType.slug,
        enabled: model.userNotificationsConsents.some(
          (userNotificationsConsent) =>
            userNotificationsConsent.notificationTypeId === notificationType.id,
        ),
      })),
    };
  }
}
