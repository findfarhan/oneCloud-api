import { Controller, Post, Body, UsePipes, ValidationPipe, BadRequestException, HttpCode, HttpStatus, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto, LoginDto } from './dto';
import { User } from './auth.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

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
  @Get('exists/:email')
  async checkUserExists(@Param('email') email: string): Promise<boolean> {
    const userExists = await this.authService.checkIfUserExists(email);
    if (!userExists) {
      throw new BadRequestException('User with this email already exist');
    }
    return true;
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard) 

  async register(@Body() registrationDto: RegistrationDto): Promise<User> {
    try {
      return await this.authService.register(registrationDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('update/:id') 
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string, 
    @Body() registrationDto: RegistrationDto, 
  ): Promise<User | null> {
    try {
      const userList =
        await this.authService.update(
          id,
          registrationDto,
        );
      if (!userList) {
        throw new NotFoundException(
          `user with ID ${id} not found.`,
        );
      }
      return userList;
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Post('delete/:id') 
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async delete(
    @Param('id') id: string, 
  ): Promise<{ message: string; deletedPartner: User | null }> {
    try {
      const userList = await this.authService.delete(id);
      if (!userList) {
        throw new NotFoundException(`user with ID ${id} not found.`);
      }
      return { message: `user with ID ${id} has been deleted.`, deletedPartner: userList };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @Get('/') 
  @UseGuards(AuthGuard) 
  async getAll(): Promise<User[]> {
    const userList = await this.authService.getAll();
    return userList;
  }

}
