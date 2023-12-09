import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  HttpCode,
  HttpStatus,
  UseGuards,
  Param,
  NotFoundException,
  Get,
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import { AddPartnerDto } from './dto';
import { Partner } from './partner.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

@Controller('partner')
export class PartnerController {
  constructor(
    private partnerService: PartnerService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() addPartnerDto: AddPartnerDto,
  ): Promise<Partner | null> {
    try {
      const user = await this.partnerService.add(
        addPartnerDto,
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
    @Param('id') id: number,
    @Body() addPartnerDto: AddPartnerDto,
  ): Promise<Partner | null> {
    try {
      const partner =
        await this.partnerService.update(
          id,
          addPartnerDto,
        );
      if (!partner) {
        throw new NotFoundException(
          `Partner with ID ${id} not found.`,
        );
      }
      return partner;
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Post('delete/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: number): Promise<{
    message: string;
    deletedPartner: Partner | null;
  }> {
    try {
      const partner =
        await this.partnerService.delete(id);
      if (!partner) {
        throw new NotFoundException(
          `Partner with ID ${id} not found.`,
        );
      }
      return {
        message: `Partner with ID ${id} has been deleted.`,
        deletedPartner: partner,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<Partner[]> {
    const partners =
      await this.partnerService.getAll();
    return partners;
  }
}
