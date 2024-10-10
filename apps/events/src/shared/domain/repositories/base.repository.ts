export interface BaseRepository<DomainEntity> {
  findByParam(
    input: BaseRepository.FindByParamInput<DomainEntity>,
  ): BaseRepository.FindByParamOutput<DomainEntity>;
  save(input: DomainEntity): Promise<DomainEntity>;
  softDelete(id: string): Promise<void>;
}

export namespace BaseRepository {
  export type FindByParamInput<DomainEntity> = {
    key: keyof DomainEntity;
    value: any;
  };
  export type FindByParamOutput<DomainEntity> = Promise<DomainEntity | null>;
}
