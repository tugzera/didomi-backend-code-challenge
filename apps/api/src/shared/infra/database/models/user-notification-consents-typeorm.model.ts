import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Relation,
} from 'typeorm';
import { BaseTypeormModel } from './base.model';
import { NotificationTypeTypeormModel } from './notification-type-typeorm.model';
import { UserTypeormModel } from './user-typeorm.model';

@Index(
  'idx__part__uq__user_notification_consents',
  ['deletedAt', 'notificationTypeId', 'userId'],
  { unique: true },
)
@Index('pk__user_notifications_consents', ['id'], { unique: true })
@Index(
  'idx__uq__user_notification_consents',
  ['notificationTypeId', 'userId'],
  { unique: true },
)
@Entity('user_notifications_consents', { schema: 'public' })
export class UserNotificationsConsentTypeormModel extends BaseTypeormModel {
  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('uuid', { name: 'notification_type_id' })
  notificationTypeId: string;

  @ManyToOne(
    () => NotificationTypeTypeormModel,
    (notificationTypes) => notificationTypes.userNotificationsConsents,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'notification_type_id', referencedColumnName: 'id' }])
  notificationType: Relation<NotificationTypeTypeormModel>;

  @ManyToOne(
    () => UserTypeormModel,
    (users) => users.userNotificationsConsents,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Relation<UserTypeormModel>;

  constructor(props: Partial<UserNotificationsConsentTypeormModel> = {}) {
    super();
    Object.assign(this, props);
  }
}
