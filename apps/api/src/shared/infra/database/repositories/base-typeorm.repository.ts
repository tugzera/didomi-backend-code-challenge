import { BaseEntity as DomainEntity } from '@shared/domain/entities';
import { BaseRepository } from '@shared/domain/repositories';
import {
  BaseEntity,
  DataSource,
  EntityTarget,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { BaseMapper } from '../mapper/base.mapper';

export abstract class BaseTypeormRepository<
  Model extends BaseEntity,
  Entity extends DomainEntity,
> implements BaseRepository<Entity>
{
  repository: Repository<Model>;
  mapper: BaseMapper<Entity, Model>;

  constructor(
    connection: DataSource,
    model: EntityTarget<Model>,
    mapper: BaseMapper,
  ) {
    this.repository = connection.getRepository(model);
    this.mapper = mapper;
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async save(input: Entity): Promise<Entity> {
    const model = this.mapper.entityToModel(input);
    await this.repository.save(model);
    return input;
  }

  async findByParam(
    input: BaseRepository.FindByParamInput<Entity>,
  ): BaseRepository.FindByParamOutput<Entity> {
    const model = await this.repository.findOne({
      where: {
        [input.key]: input.value,
      } as FindOptionsWhere<Model>,
    });
    if (!model) return null;
    return this.mapper.modelToEntity(model);
  }
}
