import { BaseEntity } from '@shared/domain/entities';

export class NotificationType extends BaseEntity {
  name: string;
  slug: string;

  constructor(props: Partial<NotificationType> = {}) {
    super(props);
    Object.assign(this, props);
  }
}
