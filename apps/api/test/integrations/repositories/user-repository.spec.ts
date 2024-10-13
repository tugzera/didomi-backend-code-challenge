import { UserTypeormModel } from '@common/infra/database/models';
import {
  NotificationTypeFactory,
  UserFactory,
  UserNotificationConsentsFactory,
} from '@test/factories';
import { databaseConnection } from '@test/setup';
import { NotificationConsent } from '@users/domain/entities';
import { UserTypeormRepository } from '@users/infra/database/repositories';
import { UserTypeormMapper } from '@users/infra/database/repositories/mapper/user-typeorm.mapper';

describe('UserTypeormRepository', () => {
  let sut: UserTypeormRepository;
  let userFactory: UserFactory;
  let userNotificationConsentsFactory: UserNotificationConsentsFactory;
  let notificationTypeFactory: NotificationTypeFactory;

  beforeAll(() => {
    sut = new UserTypeormRepository(
      databaseConnection,
      UserTypeormModel,
      new UserTypeormMapper(),
    );
    userFactory = new UserFactory(databaseConnection);
    notificationTypeFactory = new NotificationTypeFactory(databaseConnection);
    userNotificationConsentsFactory = new UserNotificationConsentsFactory(
      databaseConnection,
    );
  });

  afterAll(async () => {
    await userFactory.deleteRegisters();
    await notificationTypeFactory.deleteRegisters();
    await userNotificationConsentsFactory.deleteRegisters();
  });

  it('should sync user notification consents on success', async () => {
    const [user] = await userFactory.generateRegisters({});
    const [notificationType] = await notificationTypeFactory.generateRegisters(
      {},
    );
    user.notificationConsents = [
      new NotificationConsent({
        userId: user.id,
        notificationTypeId: notificationType.id,
        slug: notificationType.slug,
        createdAt: new Date(),
      }),
    ];
    await expect(sut.syncNotificationConsents(user)).resolves.toBeUndefined();
    const checkUserNotificationConsents =
      await userNotificationConsentsFactory.repository.find({
        where: {
          userId: user.id,
        },
      });
    expect(checkUserNotificationConsents.length).toBe(1);
    user.notificationConsents = [];
    await expect(sut.syncNotificationConsents(user)).resolves.toBeUndefined();
    const checkUserNotificationConsents2 =
      await userNotificationConsentsFactory.repository.find({
        where: {
          userId: user.id,
        },
      });
    expect(checkUserNotificationConsents2.length).toBe(0);
  });
});
