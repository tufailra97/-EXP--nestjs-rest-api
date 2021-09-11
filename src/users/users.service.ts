import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Res,
  Scope
} from '@nestjs/common';

import { errorMessages } from 'src/common/constants';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable({ scope: Scope.TRANSIENT })
export class UsersService {
  constructor(private prisma: PrismaService, private logger: Logger) {}

  async create(createUserDto: CreateUserDto) {
    const isEmailAlreayInUsed = await this.prisma.user.count({
      where: {
        email: createUserDto.email
      }
    });

    if (isEmailAlreayInUsed) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errorMessage: errorMessages.EMAIL_ALREADY_IN_USE
        },
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      const user = await this.prisma.user.create({
        data: createUserDto
      });
      return new UserEntity(user);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errorMessage: errorMessages.INTERNAL_SERVER_ERROR
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAll() {
    try {
      const users = await this.prisma.user.findMany();
      return users.map((user) => new UserEntity(user));
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errorMessage: errorMessages.INTERNAL_SERVER_ERROR
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getOneById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errorMessage: errorMessages.RESOURCE_NOT_FOUND.replace(
            '{resource}',
            'User'
          )
        },
        HttpStatus.BAD_REQUEST
      );
    }

    return new UserEntity(user);
  }

  async updateOneById(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedAt = new Date();
      const user = await this.prisma.user.update({
        where: {
          id
        },
        data: { ...updateUserDto, updatedAt }
      });

      return new UserEntity(user);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errorMessages: errorMessages.INTERNAL_SERVER_ERROR
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteOneById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id
        }
      });

      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errorMessage: errorMessages.RESOURCE_NOT_FOUND
          },
          HttpStatus.BAD_REQUEST
        );
      }

      await this.prisma.user.delete({
        where: {
          id
        }
      });
    } catch (error) {
      this.logger.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errorMessages: errorMessages.INTERNAL_SERVER_ERROR
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
