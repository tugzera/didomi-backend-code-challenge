import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PasswordDecorator } from '../../../../shared/presentation/decorators/password.decorator';

export class CreateUserDto {
  @ApiProperty({ example: 'Clark' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ example: 'Kent' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ example: 'email@teste.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @PasswordDecorator()
  password: string;
}
