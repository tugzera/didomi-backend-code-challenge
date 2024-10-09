import { GetUserListQuery } from '@account/application/queries';
import { UserTypeormModel } from '@shared/infra/database/models';
import { PaginationHelper } from '@shared/infra/helpers/pagination-helper';
import { Brackets, DataSource } from 'typeorm';

export class GetUserListTypeormQuery implements GetUserListQuery.Contract {
  constructor(private connection: DataSource) {}
  async execute({
    page,
    pageSize,
    searchString,
    sortBy,
    sortDirection,
  }: GetUserListQuery.Input): GetUserListQuery.Output {
    const repository = this.connection.getRepository(UserTypeormModel);
    const query = repository.createQueryBuilder('users');
    const dbPageIndex = page - 1;
    query.skip(dbPageIndex * pageSize).take(pageSize);
    if (searchString) {
      const words = searchString.split(' ');
      query.where(
        new Brackets((qb) => {
          words.forEach((word) => {
            qb.orWhere('users.firstName ILIKE :word', {
              word: `%${word}%`,
            });
            qb.orWhere('users.lastName ILIKE :word', {
              word: `%${word}%`,
            });
            qb.orWhere('users.email ILIKE :word', {
              word: `%${word}%`,
            });
          });
        }),
      );
    }
    if (sortBy && sortDirection) {
      query.orderBy(`users.${sortBy}`, sortDirection);
    }
    const [items, count] = await query.getManyAndCount();
    return PaginationHelper.makePagination<GetUserListQuery.Response>({
      count,
      items: items.map(
        (model): GetUserListQuery.Response => ({
          id: model.id,
          firstName: model.firstName,
          lastName: model.lastName,
          email: model.email,
        }),
      ),
      page,
      pageSize,
    });
  }
}
