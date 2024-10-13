import { NotificationTypeTypeormModel } from '@common/infra/database/models';
import { NotificationType } from '@users/domain/entities';
import { NotificationTypeTypeormMapper } from '@users/infra/database/repositories/mapper/notification-type-typeorm.mapper';

describe('NotificationTypeTypeormMapper', () => {
  const sut = new NotificationTypeTypeormMapper();
  it('should convert model to entity on success', () => {
    expect(
      sut.modelToEntity(new NotificationTypeTypeormModel({})),
    ).toBeInstanceOf(NotificationType);
  });

  it('should convert entity to model on success', () => {
    expect(sut.entityToModel(new NotificationType({}))).toBeInstanceOf(
      NotificationTypeTypeormModel,
    );
  });
});
