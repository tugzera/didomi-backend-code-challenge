import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export function LastNameDecorator(isRequired = true) {
  return applyDecorators(
    Expose(),
    ApiProperty({ name: 'lastName', example: 'Kent', nullable: !isRequired }),
    isRequired ? IsNotEmpty() : IsOptional(),
    IsString(),
    MinLength(2),
    MaxLength(100),
  );
}
