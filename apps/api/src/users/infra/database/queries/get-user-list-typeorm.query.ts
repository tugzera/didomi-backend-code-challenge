import {
  NotificationTypeTypeormModel,
  UserTypeormModel,
} from '@common/infra/database/models';
import { PaginationHelper } from '@repo/shared';
import {
  GetUserDetailsQuery,
  GetUserListQuery,
} from '@users/application/queries';
import { Brackets, DataSource } from 'typeorm';

export class GetUserListTypeormQuery implements GetUserListQuery.Contract {
  constructor(private connection: DataSource) {}
  async execute({
    page,
    pageSize,
    searchString,
    sortBy,
    sortDirection,
  }: GetUserListQuery.Input): GetUserListQuery.Output {
    const repository = this.connection.getRepository(UserTypeormModel);
    const notificationTypesRepository = this.connection.getRepository(
      NotificationTypeTypeormModel,
    );
    const notificationTypes = await notificationTypesRepository.find();
    const query = repository
      .createQueryBuilder('users')
      .leftJoinAndSelect(
        'users.userNotificationsConsents',
        'userNotificationsConsents',
      )
      .leftJoinAndSelect(
        'userNotificationsConsents.notificationType',
        'notificationType',
      );
    const dbPageIndex = page - 1;
    query.skip(dbPageIndex * pageSize).take(pageSize);
    if (searchString) {
      const words = searchString.split(' ');
      query.where(
        new Brackets((qb) => {
          words.forEach((word) => {
            qb.orWhere('users.firstName ILIKE :word', {
              word: `%${word}%`,
            });
            qb.orWhere('users.lastName ILIKE :word', {
              word: `%${word}%`,
            });
            qb.orWhere('users.email ILIKE :word', {
              word: `%${word}%`,
            });
          });
        }),
      );
    }
    if (sortBy && sortDirection) {
      query.orderBy(`users.${sortBy}`, sortDirection);
    }
    const [items, count] = await query.getManyAndCount();
    return PaginationHelper.makePagination<GetUserDetailsQuery.Response>({
      count,
      items: items.map(
        (model): GetUserDetailsQuery.Response => ({
          id: model.id,
          firstName: model.firstName,
          lastName: model.lastName,
          email: model.email,
          consents: notificationTypes.map((notificationType) => ({
            id: notificationType.slug,
            enabled: model.userNotificationsConsents.some(
              (userNotificationsConsent) =>
                userNotificationsConsent.notificationTypeId ===
                notificationType.id,
            ),
          })),
        }),
      ),
      page,
      pageSize,
    });
  }
}
