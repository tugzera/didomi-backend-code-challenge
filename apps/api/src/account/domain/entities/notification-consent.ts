import { BaseEntity } from '@shared/domain/entities';

export class NotificationConsent extends BaseEntity {
  notificationTypeId: string;
  slug: string;
  userId: string;

  constructor(props: Partial<NotificationConsent> = {}) {
    super(props);
    Object.assign(this, props);
  }
}
