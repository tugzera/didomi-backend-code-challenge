import { NotificationConsent } from '@users/domain/entities';

describe('NotificationConsent', () => {
  it('should create a new notification consent', () => {
    expect(new NotificationConsent({})).toBeDefined();
  });
});
