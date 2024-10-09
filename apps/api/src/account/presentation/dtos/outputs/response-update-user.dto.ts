import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseUpdateUserDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Clark' })
  @Expose()
  firstName: string;

  @ApiProperty({ example: 'Kent' })
  @Expose()
  lastName: string;

  @ApiProperty({ example: 'superman@teste.com' })
  @Expose()
  email: string;

  @ApiProperty({ example: '2024-10-09T14:24:55.157Z' })
  @Expose()
  createdAt: string;

  @ApiProperty({ example: '2024-10-09T14:24:55.157Z' })
  @Expose()
  updatedAt: string | null;
}
