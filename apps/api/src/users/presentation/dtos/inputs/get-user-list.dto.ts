import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationPropsDto } from '@repo/shared';
import { GetUserListQuery } from '@users/application/queries';
import { IsEnum, IsOptional } from 'class-validator';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetUserListDto extends PaginationPropsDto {
  @ApiPropertyOptional({ example: 'createdAt' })
  @IsOptional()
  @IsEnum(GetUserListQuery.SortBy)
  sortBy?: string;
}
