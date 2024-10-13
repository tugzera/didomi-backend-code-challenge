import { ApiProperty } from '@nestjs/swagger';
import {
  EmailDecorator,
  FirstNameDecorator,
  LastNameDecorator,
  UuidDecorator,
} from '@repo/shared';
import { Expose } from 'class-transformer';

export class ResponseUpdateUserDto {
  @UuidDecorator()
  id: string;

  @FirstNameDecorator()
  firstName: string;

  @LastNameDecorator()
  lastName: string;

  @EmailDecorator()
  email: string;

  @ApiProperty({ example: '2024-10-09T14:24:55.157Z' })
  @Expose()
  createdAt: string;

  @ApiProperty({ example: '2024-10-09T14:24:55.157Z' })
  @Expose()
  updatedAt: string | null;
}
