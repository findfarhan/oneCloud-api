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
import { NASService } from './nas.service';
import { NASDto } from './dto';
import { NAS } from './nas.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

interface NASResponse<T> {
  message: string;
  data: T;
}

@Controller('nas')
export class NASController {
  constructor(
    private nASService: NASService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() nASDto: NASDto,
  ): Promise<NASResponse<NAS>> {
    try {
      const user =
        await this.nASService.add(
          nASDto,
        );

      return {
        message:
          'NAS added successfully',
        data: user,
      };
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
    @Body() nASDto: NASDto,
  ): Promise<NASResponse<NAS>> {
    try {
      const NAS =
        await this.nASService.update(
          id,
          nASDto,
        );
      if (!NAS) {
        throw new NotFoundException(
          `NAS with ID ${id} not found.`,
        );
      }
      return {
        message:
          'NAS updated successfully',
        data: NAS,
      };
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
  ): Promise<{
    message: string;
    deletedNAS: NAS | null;
  }> {
    try {
      const NAS =
        await this.nASService.delete(id);
      if (!NAS) {
        throw new NotFoundException(
          `NAS with ID ${id} not found.`,
        );
      }
      return {
        message: `NAS with ID ${id} has been deleted.`,
        deletedNAS: NAS,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<NAS[]> {
    const NAS =
      await this.nASService.getAll();
    return NAS;
  }

  @Get('ipNas')
  @UseGuards(AuthGuard)
  async getAllIpNas(): Promise<string[]> {
    return this.nASService.getAllIpNas();
  }

}
