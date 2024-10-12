import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationPropsDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(100)
  pageSize?: number = 10;

  @ApiPropertyOptional({ example: 'searchString' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  searchString?: string;

  @ApiPropertyOptional({ example: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ example: 'ASC' })
  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection?: string;
}
