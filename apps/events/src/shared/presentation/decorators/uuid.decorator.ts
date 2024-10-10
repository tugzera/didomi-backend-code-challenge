import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export function UuidDecorator(isRequired = true) {
  return applyDecorators(
    Expose(),
    ApiProperty({ name: 'lastName', example: 'Kent', nullable: !isRequired }),
    isRequired ? IsNotEmpty() : IsOptional(),
    IsUUID(),
  );
}
