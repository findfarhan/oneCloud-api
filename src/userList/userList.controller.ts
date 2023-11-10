import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  UseGuards,
  Param,
  NotFoundException,
  Get,
} from '@nestjs/common';
import { UserListService } from './userList.service';
import { AddUserListDto } from './dto';
import { UserList } from './userList.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

@Controller('userList')
export class UserListController {
  constructor(
    private userListService: UserListService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() addUserListDto: AddUserListDto,
  ): Promise<UserList | null> {
    try {
      const user = await this.userListService.add(
        addUserListDto,
      );

      return user;
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Post('update/:id') 
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string, 
    @Body() addUserListDto: AddUserListDto, 
  ): Promise<UserList | null> {
    try {
      const userList =
        await this.userListService.update(
          id,
          addUserListDto,
        );
      if (!userList) {
        throw new NotFoundException(
          `userList with ID ${id} not found.`,
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
  ): Promise<{ message: string; deletedPartner: UserList | null }> {
    try {
      const userList = await this.userListService.delete(id);
      if (!userList) {
        throw new NotFoundException(`userList with ID ${id} not found.`);
      }
      return { message: `userList with ID ${id} has been deleted.`, deletedPartner: userList };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @Get('/') 
  @UseGuards(AuthGuard) 
  async getAll(): Promise<UserList[]> {
    const userList = await this.userListService.getAll();
    return userList;
  }
 
}
