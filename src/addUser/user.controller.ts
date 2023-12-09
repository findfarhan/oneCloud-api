/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { HomeService } from './user.service';
import { AddUserDto } from './dto';
import { Home } from './user.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() addUserDto: AddUserDto,
  ): Promise<Home | null> {
    try {
      const user =
        await this.homeService.add(addUserDto);

      return user;
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }
}
