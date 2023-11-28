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
import { RateService } from './rate.service';
import { RateDto } from './dto';
import { Rate } from './rate.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

interface KnotsResponse<T> {
  message: string;
  data: T;
}

@Controller('rate')
export class RateController {
  constructor(
    private rateService: RateService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() rateDto: RateDto,
  ): Promise<KnotsResponse<Rate>> {
    try {
      const user =
        await this.rateService.add(
          rateDto,
        );

      return {
        message:
          'Rate added successfully',
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
    @Body() rateDto: RateDto,
  ): Promise<KnotsResponse<Rate>> {
    try {
      const Rate =
        await this.rateService.update(
          id,
          rateDto,
        );
      if (!Rate) {
        throw new NotFoundException(
          `Rate with ID ${id} not found.`,
        );
      }
      return {
        message:
          'Rate updated successfully',
        data: Rate,
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
    deletedKnots: Rate | null;
  }> {
    try {
      const Rate =
        await this.rateService.delete(id);
      if (!Rate) {
        throw new NotFoundException(
          `Rate with ID ${id} not found.`,
        );
      }
      return {
        message: `Rate with ID ${id} has been deleted.`,
        deletedKnots: Rate,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<Rate[]> {
    const Rate =
      await this.rateService.getAll();
    return Rate;
  }
}
