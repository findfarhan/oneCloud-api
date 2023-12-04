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
import { BundleService } from './bundle.service';
import { BundleDto } from './dto';
import { Bundle } from './bundle.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

interface KnotsResponse<T> {
  message: string;
  data: T;
}

@Controller('bundle')
export class BundleController {
  constructor(
    private bundleService: BundleService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() bundleDto: BundleDto,
  ): Promise<KnotsResponse<Bundle>> {
    try {
      const user =
        await this.bundleService.add(
          bundleDto,
        );

      return {
        message:
          'Bundle added successfully',
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
    @Body() bundleDto: BundleDto,
  ): Promise<KnotsResponse<Bundle>> {
    try {
      const bundle =
        await this.bundleService.update(
          id,
          bundleDto,
        );
      if (!bundle) {
        throw new NotFoundException(
          `Bundle with ID ${id} not found.`,
        );
      }
      return {
        message:
          'Bundle updated successfully',
        data: bundle,
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
    deletedKnots: Bundle | null;
  }> {
    try {
      const bundle =
        await this.bundleService.delete(id);
      if (!bundle) {
        throw new NotFoundException(
          `Bundle with ID ${id} not found.`,
        );
      }
      return {
        message: `Bundle with ID ${id} has been deleted.`,
        deletedKnots: bundle,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<Bundle[]> {
    const bundle =
      await this.bundleService.getAll();
    return bundle;
  }
}
