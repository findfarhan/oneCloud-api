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
import { PassiveInvoiceService } from './passiveInvoice.service';
import { PassiveInvoiceDto } from './dto';
import { PassiveInvoice } from './passiveInvoice.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

@Controller('passiveInvoice')
export class PassiveInvoiceController {
  constructor(
    private passiveInvoiceService: PassiveInvoiceService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() passiveInvoiceDto: PassiveInvoiceDto,
  ): Promise<PassiveInvoice | null> {
    try {
      const user = await this.passiveInvoiceService.add(
        passiveInvoiceDto,
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
    @Body() passiveInvoiceDto: PassiveInvoiceDto, 
  ): Promise<PassiveInvoice | null> {
    try {
      const passiveInvoice =
        await this.passiveInvoiceService.update(
          id,
          passiveInvoiceDto,
        );
      if (!passiveInvoice) {
        throw new NotFoundException(
          `passiveInvoice with ID ${id} not found.`,
        );
      }
      return passiveInvoice;
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
  ): Promise<{ message: string; deletedPartner: PassiveInvoice | null }> {
    try {
      const passiveInvoice = await this.passiveInvoiceService.delete(id);
      if (!passiveInvoice) {
        throw new NotFoundException(`passiveInvoice with ID ${id} not found.`);
      }
      return { message: `passiveInvoice with ID ${id} has been deleted.`, deletedPartner: passiveInvoice };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @Get('/') 
  @UseGuards(AuthGuard) 
  async getAll(): Promise<PassiveInvoice[]> {
    const passiveInvoice = await this.passiveInvoiceService.getAll();
    return passiveInvoice;
  }
 
}
