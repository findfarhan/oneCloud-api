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
import { CondominiumsService } from './condominiums.service';
import { CondominiumsDto } from './dto';
import { Condominiums } from './condominiums.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

interface CondominiumsResponse<T> {
  message: string;
  data: T;
}

@Controller('condominiums')
export class CondominiumsController {
  constructor(
    private condominiumsService: CondominiumsService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() condominiumsDto: CondominiumsDto,
  ): Promise<CondominiumsResponse<Condominiums>> {
    try {
      const user =
        await this.condominiumsService.add(
          condominiumsDto,
        );

      return {
        message:
          'Condominiums added successfully',
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
    @Body() condominiumsDto: CondominiumsDto,
  ): Promise<CondominiumsResponse<Condominiums>> {
    try {
      const Condominiums =
        await this.condominiumsService.update(
          id,
          condominiumsDto,
        );
      if (!Condominiums) {
        throw new NotFoundException(
          `Condominiums with ID ${id} not found.`,
        );
      }
      return {
        message:
          'Condominiums updated successfully',
        data: Condominiums,
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
    deletedCondominiums: Condominiums | null;
  }> {
    try {
      const Condominiums =
        await this.condominiumsService.delete(id);
      if (!Condominiums) {
        throw new NotFoundException(
          `Condominiums with ID ${id} not found.`,
        );
      }
      return {
        message: `Condominiumswith ID ${id} has been deleted.`,
        deletedCondominiums: Condominiums,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<Condominiums[]> {
    const Condominiums =
      await this.condominiumsService.getAll();
    return Condominiums;
  }
}
