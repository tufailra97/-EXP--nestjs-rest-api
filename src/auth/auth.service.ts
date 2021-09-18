import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getOneByEmail(email);

    if (user.password === password) {
      return user;
    }

    return null;
  }

  async loginUser(user: any) {
    console.log('#');
    const payload = { username: user.username, sub: user.id };
    const token = {
      token: this.jwtService.sign(payload)
    };

    return token;
  }
}
