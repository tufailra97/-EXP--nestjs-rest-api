import { Exclude } from 'class-transformer';
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { User, UserRole } from '@prisma/client';

export class CreateUserDto implements User {
  @Exclude()
  id: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  username: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(20)
  @IsAlphanumeric()
  password: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
