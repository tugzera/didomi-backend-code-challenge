import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { BaseTypeormModel } from './base.model';
import { UserNotificationsConsentTypeormModel } from './user-notification-consents-typeorm.model';

@Index('idx__uq__email', ['deletedAt', 'email'], { unique: true })
@Index('idx__part__uq__email', ['email'], { unique: true })
@Index('pk__users', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class UserTypeormModel extends BaseTypeormModel {
  @Column('character varying', { name: 'first_name', length: 100 })
  firstName: string;

  @Column('character varying', { name: 'last_name', length: 100 })
  lastName: string;

  @Column('character varying', { name: 'email', length: 100 })
  email: string;

  @Column('character varying', { name: 'password_hash', length: 255 })
  passwordHash: string;

  @OneToMany(
    () => UserNotificationsConsentTypeormModel,
    (userNotificationsConsents) => userNotificationsConsents.user,
  )
  userNotificationsConsents: Relation<UserNotificationsConsentTypeormModel[]>;

  constructor(props: Partial<UserTypeormModel> = {}) {
    super();
    Object.assign(this, props);
  }
}
