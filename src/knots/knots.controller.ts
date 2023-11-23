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
import { KnotsService } from './knots.service';
import { KnotsDto } from './dto';
import { Knots } from './knots.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

interface KnotsResponse<T> {
  message: string;
  data: T;
}

@Controller('knots')
export class KnotsController {
  constructor(
    private knotsService: KnotsService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() knotsDto: KnotsDto,
  ): Promise<KnotsResponse<Knots>> {
    try {
      const user =
        await this.knotsService.add(
          knotsDto,
        );

      return {
        message:
          'Knots added successfully',
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
    @Body() knotsDto: KnotsDto,
  ): Promise<KnotsResponse<Knots>> {
    try {
      const Knots =
        await this.knotsService.update(
          id,
          knotsDto,
        );
      if (!Knots) {
        throw new NotFoundException(
          `Knots with ID ${id} not found.`,
        );
      }
      return {
        message:
          'Knots updated successfully',
        data: Knots,
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
    deletedKnots: Knots | null;
  }> {
    try {
      const Knots =
        await this.knotsService.delete(id);
      if (!Knots) {
        throw new NotFoundException(
          `Knots with ID ${id} not found.`,
        );
      }
      return {
        message: `Knots with ID ${id} has been deleted.`,
        deletedKnots: Knots,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<Knots[]> {
    const Knots =
      await this.knotsService.getAll();
    return Knots;
  }
}
