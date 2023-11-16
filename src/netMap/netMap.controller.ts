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
import { NetMapService } from './netMap.service';
import { NetMapDto } from './dto';
import { NetMap } from './netMap.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

@Controller('netMap')
export class NetMapController {
  constructor(
    private netMapService: NetMapService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() netMapDto: NetMapDto,
  ): Promise<NetMap | null> {
    try {
      const user = await this.netMapService.add(
        netMapDto,
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
    @Body() netMapDto: NetMapDto, 
  ): Promise<NetMap | null> {
    try {
      const netMap =
        await this.netMapService.update(
          id,
          netMapDto,
        );
      if (!netMap) {
        throw new NotFoundException(
          `netMap with ID ${id} not found.`,
        );
      }
      return netMap;
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
  ): Promise<{ message: string; deletedPartner: NetMap | null }> {
    try {
      const netMap = await this.netMapService.delete(id);
      if (!netMap) {
        throw new NotFoundException(`netMap with ID ${id} not found.`);
      }
      return { message: `netMap with ID ${id} has been deleted.`, deletedPartner: netMap };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @Get('/') 
  @UseGuards(AuthGuard) 
  async getAll(): Promise<NetMap[]> {
    const netMap = await this.netMapService.getAll();
    return netMap;
  }
 
}
