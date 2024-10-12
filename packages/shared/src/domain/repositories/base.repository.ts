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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
  };
  export type FindByParamOutput<DomainEntity> = Promise<DomainEntity | null>;
}
