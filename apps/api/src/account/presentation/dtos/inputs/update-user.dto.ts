import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PasswordDecorator } from '../../../../shared/presentation/decorators/password.decorator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Clark' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  firstName?: string;

  @ApiProperty({ example: 'Kent' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  lastName?: string;

  @ApiProperty({ example: 'email@teste.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @PasswordDecorator(false)
  password?: string;
}
