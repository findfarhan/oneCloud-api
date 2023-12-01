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
import { InventionGridService } from './inventionGrid.service';
import { InventionGridDto } from './dto';
import { InventionGrid } from './inventionGrid.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

interface KnotsResponse<T> {
  message: string;
  data: T;
}

@Controller('technicalInvention')
export class InventionGridController {
  constructor(
    private inventionGridService: InventionGridService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() inventionGridDto: InventionGridDto,
  ): Promise<KnotsResponse<InventionGrid>> {
    try {
      const user =
        await this.inventionGridService.add(
          inventionGridDto,
        );

      return {
        message:
          'inventionGrid added successfully',
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
    @Body() inventionGridDto: InventionGridDto,
  ): Promise<KnotsResponse<InventionGrid>> {
    try {
      const inventionGrid =
        await this.inventionGridService.update(
          id,
          inventionGridDto,
        );
      if (!inventionGrid) {
        throw new NotFoundException(
          `inventionGrid with ID ${id} not found.`,
        );
      }
      return {
        message:
          'inventionGrid updated successfully',
        data: inventionGrid,
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
    deletedKnots: InventionGrid | null;
  }> {
    try {
      const inventionGrid =
        await this.inventionGridService.delete(id);
      if (!inventionGrid) {
        throw new NotFoundException(
          `inventionGrid with ID ${id} not found.`,
        );
      }
      return {
        message: `inventionGrid with ID ${id} has been deleted.`,
        deletedKnots: inventionGrid,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<InventionGrid[]> {
    const inventionGrid =
      await this.inventionGridService.getAll();
    return inventionGrid;
  }
}
