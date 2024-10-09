import { User } from 'src/account/domain/entities/user';
import { UserTypeormModel } from '../../../../shared/infra/database/models/user.model';
import { BaseTypeormRepository } from '../../../../shared/infra/database/repositories/base-typeorm.repository';
import { UserRepository } from '../../../domain/repositories';

export class UserTypeormRepository
  extends BaseTypeormRepository<UserTypeormModel, User>
  implements UserRepository {}
