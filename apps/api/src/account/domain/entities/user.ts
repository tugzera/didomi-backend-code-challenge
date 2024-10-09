import { BaseEntity } from '@shared/domain/entities';
import { DomainValidationException } from '@shared/domain/exceptions';
import { NotificationConsent } from './notification-consent';

export class User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string | null;
  notificationConsents: NotificationConsent[] = [];

  constructor(props: Partial<User> = {}) {
    super(props);
    Object.assign(this, props);
  }

  static create(props: User.CreateProps) {
    this.validate(props);
    return new User({
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      password: props.password,
      phoneNumber: props.phoneNumber || null,
    });
  }

  private static validate(props: User.CreateProps) {
    if (props.email.length >= 100)
      throw new DomainValidationException('Invalid email');
    if (props.firstName.length < 2 || props.firstName.length > 100)
      throw new DomainValidationException('Invalid first name');
    if (props.lastName.length < 2 || props.lastName.length > 100)
      throw new DomainValidationException('Invalid last name');
    if (props.password.length < 8 || props.password.length > 100)
      throw new DomainValidationException('Invalid password');
  }

  update(props: User.UpdateProps) {
    Object.entries(props).forEach((value) => {
      const [key, param] = value;
      if (props[key] !== undefined) {
        this[key] = param;
      }
    });
    this.updatedAt = new Date();
  }
}

export namespace User {
  export type CreateProps = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
  };
  export type UpdateProps = {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
  };
}
