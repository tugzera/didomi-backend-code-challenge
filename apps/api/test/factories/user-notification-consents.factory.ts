import { UserNotificationsConsentTypeormModel } from '@common/infra/database/models';
import { randomUUID } from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { RegisterFactory } from './base.factory';

export class UserNotificationConsentsFactory
  implements RegisterFactory<UserNotificationsConsentTypeormModel>
{
  repository: Repository<UserNotificationsConsentTypeormModel>;

  private ids: string[] = [];

  constructor(private connection?: DataSource) {
    if (this.connection) {
      this.repository = this.connection.getRepository(
        UserNotificationsConsentTypeormModel,
      );
    }
  }

  async generateRegisters(params: {
    props?: Partial<UserNotificationsConsentTypeormModel>;
    count?: number;
  }): Promise<UserNotificationsConsentTypeormModel[]> {
    if (this.connection) {
      const { props, count } = params;
      const items = Array.from({ length: count || 1 }, () =>
        this.generateEntity(props),
      );
      await this.repository.save(items);
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

  generateEntity(
    props?: Partial<UserNotificationsConsentTypeormModel>,
  ): UserNotificationsConsentTypeormModel {
    const user = new UserNotificationsConsentTypeormModel({
      id: props?.id || randomUUID(),
      notificationTypeId: props?.notificationTypeId || randomUUID(),
      userId: props?.userId || randomUUID(),
      createdAt: props?.createdAt || new Date(),
      updatedAt: props?.updatedAt || null,
      deletedAt: props?.deletedAt || null,
    });
    return user;
  }
}
