import { EventTypeormModel } from '@common/infra/database/models';
import { Event } from '@events/domain/entities';
import { EventTypeormMapper } from '@events/infra/database/repositories/mapper/event-typeorm.mapper';

describe('EventTypeormMapper', () => {
  let sut: EventTypeormMapper;

  beforeAll(() => {
    sut = new EventTypeormMapper();
  });

  it('should convert model to entity on success', () => {
    expect(sut.modelToEntity(new EventTypeormModel())).toBeInstanceOf(Event);
  });
});
