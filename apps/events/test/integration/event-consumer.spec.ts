import { EventConsumer } from '@events/application/consumers/event-consumer';
import { EventRepository } from '@events/domain/repositories';
import { mock, MockProxy } from 'jest-mock-extended';

describe('EventConsumer', () => {
  let sut: EventConsumer;
  let eventRepository: MockProxy<EventRepository>;

  beforeEach(() => {
    eventRepository = mock<EventRepository>();
    sut = new EventConsumer(eventRepository);
  });

  it('should save event with correct values', async () => {
    await expect(
      sut.execute({ eventType: 'TEST', payload: { id: '1' } }),
    ).resolves.toBeUndefined();
    expect(eventRepository.save).toHaveBeenCalledTimes(1);
  });
});
