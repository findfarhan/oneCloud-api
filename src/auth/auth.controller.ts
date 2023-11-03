import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto, LoginDto } from './dto';
import { User } from './auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<User | null> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registrationDto: RegistrationDto): Promise<User> {
    return this.authService.register(registrationDto);
  }
}
