import { faker } from '@faker-js/faker';
import { UserTypeormModel } from '@shared/infra/database/models/user-typeorm.model';
import { randomUUID } from 'crypto';
import { User } from 'src/account/domain/entities/user';
import { UserTypeormMapper } from 'src/account/infra/database/repositories/mapper/user-typeorm.mapper';
import { BcryptHashAdapter } from 'src/shared/infra/hash/bcrypt-hash.adapter';
import { DataSource, Repository } from 'typeorm';
import { RegisterFactory } from './base.factory';

export class UserFactory implements RegisterFactory<User> {
  repository: Repository<UserTypeormModel>;

  private ids: string[] = [];

  constructor(private connection?: DataSource) {
    if (this.connection) {
      this.repository = this.connection.getRepository(UserTypeormModel);
    }
  }

  async generateRegisters(params: {
    props?: Partial<User>;
    count?: number;
  }): Promise<User[]> {
    if (this.connection) {
      const { props, count } = params;
      const items = Array.from({ length: count || 1 }, () =>
        this.generateEntity(props),
      );
      const mapper = new UserTypeormMapper();
      const models = items.map((item) => mapper.entityToModel(item));
      await this.repository.save(models);
      this.ids = this.ids.concat(items.map((item) => item.id));
      return items;
    }
    return [];
  }

  async deleteRegisters(): Promise<void> {
    if (this.ids.length && this.connection) {
      await this.repository.softDelete(this.ids);
    }
  }

  generateEntity(props?: Partial<User>): User {
    const hashGenerator = new BcryptHashAdapter();
    const user = new User({
      id: props?.id || randomUUID(),
      firstName: props?.firstName || faker.person.firstName(),
      lastName: props?.lastName || faker.person.lastName(),
      email: props?.email || faker.internet.email().toLocaleLowerCase(),
      password: props?.password
        ? hashGenerator.hash(props.password)
        : hashGenerator.hash('.Senha532'),
      createdAt: props?.createdAt || new Date(),
      updatedAt: props?.updatedAt || null,
      deletedAt: props?.deletedAt || null,
    });
    return user;
  }
}
