import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller({
  version: '1'
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/user/login')
  async login(@Body() req) {
    return this.authService.loginUser(req);
  }
}
