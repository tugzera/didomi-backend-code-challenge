import { NotificationTypeTypeormModel } from '@common/infra/database/models';
import { databaseConnection } from '@test/setup';
import { NotificationTypeTypeormRepository } from '@users/infra/database/repositories';
import { NotificationTypeTypeormMapper } from '@users/infra/database/repositories/mapper/notification-type-typeorm.mapper';

describe('NotificationTypeTypeormRepository', () => {
  let sut: NotificationTypeTypeormRepository;

  beforeAll(() => {
    sut = new NotificationTypeTypeormRepository(
      databaseConnection,
      NotificationTypeTypeormModel,
      new NotificationTypeTypeormMapper(),
    );
  });

  it('should return empty notification types if empty list of slugs provided', async () => {
    await expect(sut.findAllyBySlug([])).resolves.toStrictEqual([]);
  });

  it('should return empty notification types if empty list of slugs provided', async () => {
    const result = await sut.findAllyBySlug(['sms_notification']);
    expect(result.length).toBe(1);
  });
});
