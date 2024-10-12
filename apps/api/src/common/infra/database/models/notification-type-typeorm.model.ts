import { BaseTypeormModel } from '@repo/shared';
import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { UserNotificationsConsentTypeormModel } from './user-notification-consents-typeorm.model';

@Index('idx__part__uq__notification_type_name', ['deletedAt', 'name'], {
  unique: true,
})
@Index('idx__part__uq__notification_type_name_slug', ['deletedAt', 'slug'], {
  unique: true,
})
@Index('pk__notification_types', ['id'], { unique: true })
@Index('idx__uq__notification_type_name', ['name'], { unique: true })
@Index('idx__uq__notification_type_name_slug', ['slug'], { unique: true })
@Entity('notification_types', { schema: 'public' })
export class NotificationTypeTypeormModel extends BaseTypeormModel {
  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('character varying', { name: 'slug', length: 100 })
  slug: string;

  @OneToMany(
    () => UserNotificationsConsentTypeormModel,
    (userNotificationsConsents) => userNotificationsConsents.notificationType,
  )
  userNotificationsConsents: Relation<UserNotificationsConsentTypeormModel[]>;

  constructor(props: Partial<NotificationTypeTypeormModel> = {}) {
    super();
    Object.assign(this, props);
  }
}
