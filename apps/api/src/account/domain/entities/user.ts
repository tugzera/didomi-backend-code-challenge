import { BaseEntity } from '@shared/domain/entities';

export class User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(props: Partial<User> = {}) {
    super(props);
    Object.assign(this, props);
  }

  static create(props: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return new User({
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      password: props.password,
    });
  }

  update(props: {
    email: string | undefined;
    password?: string;
    firstName?: string;
    lastName?: string;
  }) {
    Object.entries(props).forEach((value) => {
      const [key, param] = value;
      if (props[key] !== undefined) {
        this[key] = param;
      }
    });
    this.updatedAt = new Date();
  }
}
