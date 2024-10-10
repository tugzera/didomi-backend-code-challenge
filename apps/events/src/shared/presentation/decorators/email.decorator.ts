import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export function EmailDecorator(isRequired = true) {
  return applyDecorators(
    Expose(),
    ApiProperty({
      name: 'email',
      example: 'superman@test.com',
      nullable: !isRequired,
    }),
    isRequired ? IsNotEmpty() : IsOptional(),
    IsEmail(),
    MaxLength(100),
  );
}
