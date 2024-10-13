import { ApiProperty } from '@nestjs/swagger';
import {
  FirstNameDecorator,
  LastNameDecorator,
  UuidDecorator,
} from '@repo/shared';

import { Expose } from 'class-transformer';

class Consent {
  @ApiProperty({ example: 'email_notification' })
  id: string;

  @ApiProperty({ example: true })
  enabled: boolean;
}

export class ResponseGetUserDetailsDto {
  @UuidDecorator()
  id: string;

  @FirstNameDecorator()
  firstName: string;

  @LastNameDecorator()
  lastName: string;

  @ApiProperty({ example: 'superman@teste.com' })
  @Expose()
  email: string;

  @ApiProperty({ type: Consent, isArray: true })
  @Expose()
  consents: Consent[];
}
