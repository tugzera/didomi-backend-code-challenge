import { ApiProperty } from '@nestjs/swagger';
import {
  FirstNameDecorator,
  LastNameDecorator,
  UuidDecorator,
} from '@repo/shared';

import { Expose } from 'class-transformer';

export class ResponseGetUserListDto {
  @UuidDecorator()
  id: string;

  @FirstNameDecorator()
  firstName: string;

  @LastNameDecorator()
  lastName: string;

  @ApiProperty({ example: 'superman@teste.com' })
  @Expose()
  email: string;
}
