import { User } from '@account/domain/entities/user';
import { UserRepository } from '@account/domain/repositories';
import { UserTypeormModel } from '@shared/infra/database/models';
import { BaseTypeormRepository } from '@shared/infra/database/repositories/base-typeorm.repository';

export class UserTypeormRepository
  extends BaseTypeormRepository<UserTypeormModel, User>
  implements UserRepository {}
