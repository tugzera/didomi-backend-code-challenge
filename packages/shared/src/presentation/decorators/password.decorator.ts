import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export function PasswordDecorator(isRequired = true) {
  return applyDecorators(
    ApiProperty({ name: 'password', example: '.Senha123' }),
    isRequired ? IsNotEmpty() : IsOptional(),
    IsString(),
    MinLength(8),
    MaxLength(100),
    Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*.])(?=.*[0-9]).{8,}/, {
      message: 'password too weak',
    }),
  );
}
