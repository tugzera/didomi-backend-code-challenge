import { BaseEntity } from '@repo/shared';

export class NotificationConsent extends BaseEntity {
  notificationTypeId: string;
  slug: string;
  userId: string;

  constructor(props: Partial<NotificationConsent> = {}) {
    super(props);
    Object.assign(this, props);
  }
}
