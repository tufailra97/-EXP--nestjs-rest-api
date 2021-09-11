import { serialize } from 'class-transformer';

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller({
  path: 'users',
  version: '1'
})
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  async getOneById(@Param('id') id: string) {
    return new UserEntity(await this.usersService.getOneById(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  updateOneById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateOneById(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  deleteOneById(@Param('id') id: string) {
    return this.usersService.deleteOneById(id);
  }
}
