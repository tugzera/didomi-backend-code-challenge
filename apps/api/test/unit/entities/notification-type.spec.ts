import { NotificationType } from '@users/domain/entities';

describe('NotificationType', () => {
  it('should create a new notification consent', () => {
    expect(new NotificationType({})).toBeDefined();
  });
});
