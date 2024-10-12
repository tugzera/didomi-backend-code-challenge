import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export function PhoneNumberDecorator(isRequired = true) {
  return applyDecorators(
    Expose(),
    ApiProperty({
      name: 'phoneNumber',
      example: '(28) 99236-6241',
      nullable: !isRequired,
    }),
    isRequired ? IsNotEmpty() : IsOptional(),
    IsString(),
    IsPhoneNumber('BR'),
    Transform(({ value }) => {
      return typeof value === 'string'
        ? value.replace(/([^\w]+|\s+)/g, '')
        : value;
    }),
    MaxLength(15),
  );
}
