import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDto {
  @ApiProperty()
  errorMessage: string;

  @ApiProperty()
  status: number;

  @ApiProperty({ required: false })
  error: any;
}
