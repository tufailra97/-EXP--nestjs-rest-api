import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false })
  email;

  @ApiProperty({ required: false })
  password;

  @ApiProperty({ required: false })
  username;

  @ApiProperty({ required: false })
  role;
}
