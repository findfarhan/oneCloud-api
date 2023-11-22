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
import { IpListService } from './ipList.service';
import { IpListDto } from './dto';
import { IpList } from './ipList.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

@Controller('ip')
export class IpListController {
  constructor(
    private ipListService: IpListService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() ipListDto: IpListDto,
  ): Promise<IpList | null> {
    try {
      const user = await this.ipListService.add(
        ipListDto,
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
    @Body() ipListDto: IpListDto, 
  ): Promise<IpList | null> {
    try {
      const IpList =
        await this.ipListService.update(
          id,
          ipListDto,
        );
      if (!IpList) {
        throw new NotFoundException(
          `IP List with ID ${id} not found.`,
        );
      }
      return IpList;
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
  ): Promise<{ message: string; deletedPartner: IpList | null }> {
    try {
      const IpList = await this.ipListService.delete(id);
      if (!IpList) {
        throw new NotFoundException(`IP List with ID ${id} not found.`);
      }
      return { message: `IP List with ID ${id} has been deleted.`, deletedPartner: IpList };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @Get('/') 
  @UseGuards(AuthGuard) 
  async getAll(): Promise<IpList[]> {
    const IpList = await this.ipListService.getAll();
    return IpList;
  }
 
}
