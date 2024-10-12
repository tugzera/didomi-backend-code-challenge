import { EventTypeormModel } from '@common/infra/database/models';
import { Event } from '@events/domain/entities';
import { BaseMapper } from '@repo/shared';

export class EventTypeormMapper
  implements BaseMapper<Event, EventTypeormModel>
{
  entityToModel(domain: Event): EventTypeormModel {
    return new EventTypeormModel({
      id: domain.id,
      eventType: domain.eventType,
      payload: domain.payload,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt,
    });
  }

  modelToEntity(model: EventTypeormModel): Event {
    return new Event({
      id: model.id,
      alternativeId: model.alternativeId,
      eventType: model.eventType,
      payload: model.payload,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
