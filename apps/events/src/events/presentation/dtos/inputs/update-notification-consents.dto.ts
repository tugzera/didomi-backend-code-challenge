import { ApiProperty } from '@nestjs/swagger';
import { UuidDecorator } from '@shared/presentation/decorators';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';

class UserDto {
  @UuidDecorator()
  id: string;
}

enum ConsentType {
  EMAIL = 'email_notifications',
  SMS = 'sms_notifications',
}

class ConsentsDto {
  @ApiProperty({ example: 'email_notifications' })
  @IsNotEmpty()
  @IsEnum(ConsentType)
  id: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  enabled: boolean;
}

export class UpdateNotificationConsentsDto {
  @ApiProperty({ type: UserDto })
  @IsObject()
  @IsNotEmpty()
  @Type(() => UserDto)
  @ValidateNested()
  user: UserDto;

  @ApiProperty({ type: ConsentsDto, isArray: true })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @Type(() => ConsentsDto)
  @ValidateNested({ each: true })
  consents: ConsentsDto[];
}
