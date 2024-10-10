import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export function UuidDecorator(isRequired = true) {
  return applyDecorators(
    Expose(),
    ApiProperty({
      name: 'id',
      example: 'f293a35e-47e1-46e6-adf4-6883a731aabf',
      nullable: !isRequired,
    }),
    isRequired ? IsNotEmpty() : IsOptional(),
    IsUUID(),
  );
}
