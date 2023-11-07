import { Controller, Post, Body, UsePipes, ValidationPipe, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto, LoginDto } from './dto';
import { User } from './auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginDto: LoginDto): Promise<User | null> {
    try {
      const user = await this.authService.login(loginDto);

      if (!user) {
        throw new BadRequestException('Invalid email or password'); // Custom error message
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() registrationDto: RegistrationDto): Promise<User> {
    try {
      return await this.authService.register(registrationDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
