import { NotificationTypeTypeormModel } from '@common/infra/database/models';
import { faker } from '@faker-js/faker';
import { NotificationType } from '@users/domain/entities';
import { NotificationTypeTypeormMapper } from '@users/infra/database/repositories/mapper/notification-type-typeorm.mapper';
import { randomUUID } from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { RegisterFactory } from './base.factory';

export class NotificationTypeFactory
  implements RegisterFactory<NotificationType>
{
  repository: Repository<NotificationTypeTypeormModel>;

  private ids: string[] = [];

  constructor(private connection?: DataSource) {
    if (this.connection) {
      this.repository = this.connection.getRepository(
        NotificationTypeTypeormModel,
      );
    }
  }

  async generateRegisters(params: {
    props?: Partial<NotificationType>;
    count?: number;
  }): Promise<NotificationType[]> {
    if (this.connection) {
      const { props, count } = params;
      const items = Array.from({ length: count || 1 }, () =>
        this.generateEntity(props),
      );
      const mapper = new NotificationTypeTypeormMapper();
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

  generateEntity(props?: Partial<NotificationType>): NotificationType {
    const user = new NotificationType({
      id: props?.id || randomUUID(),
      name: props?.name || faker.commerce.productName(),
      slug: props?.slug || faker.commerce.productName(),
      createdAt: props?.createdAt || new Date(),
      updatedAt: props?.updatedAt || null,
      deletedAt: props?.deletedAt || null,
    });
    return user;
  }
}
