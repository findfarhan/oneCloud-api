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
import { MorRatesService } from './morRates.service';
import { MorRatesDto } from './dto';
import { MorRates } from './morRates.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

interface KnotsResponse<T> {
  message: string;
  data: T;
}

@Controller('morRates')
export class MorRatesController {
  constructor(
    private morRatesService: MorRatesService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() morRatesDto: MorRatesDto,
  ): Promise<KnotsResponse<MorRates>> {
    try {
      const user =
        await this.morRatesService.add(
          morRatesDto,
        );

      return {
        message:
          'MorRates added successfully',
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
    @Body() morRatesDto: MorRatesDto,
  ): Promise<KnotsResponse<MorRates>> {
    try {
      const MorRates =
        await this.morRatesService.update(
          id,
          morRatesDto,
        );
      if (!MorRates) {
        throw new NotFoundException(
          `MorRates with ID ${id} not found.`,
        );
      }
      return {
        message:
          'MorRates updated successfully',
        data: MorRates,
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
    deletedKnots: MorRates | null;
  }> {
    try {
      const MorRates =
        await this.morRatesService.delete(id);
      if (!MorRates) {
        throw new NotFoundException(
          `MorRates with ID ${id} not found.`,
        );
      }
      return {
        message: `MorRates with ID ${id} has been deleted.`,
        deletedKnots: MorRates,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<MorRates[]> {
    const MorRates =
      await this.morRatesService.getAll();
    return MorRates;
  }
}
