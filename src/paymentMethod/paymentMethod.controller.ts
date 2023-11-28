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
import { PaymentMethodService } from './paymentMethod.service';
import { PaymentMethodDto } from './dto';
import { PaymentMethod } from './paymentMethod.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

interface KnotsResponse<T> {
  message: string;
  data: T;
}

@Controller('paymentMethod')
export class PaymentMethodController {
  constructor(
    private paymentMethodService: PaymentMethodService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() paymentMethodDto: PaymentMethodDto,
  ): Promise<KnotsResponse<PaymentMethod>> {
    try {
      const user =
        await this.paymentMethodService.add(
          paymentMethodDto,
        );

      return {
        message:
          'Payment Method added successfully',
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
    @Body() paymentMethodDto: PaymentMethodDto,
  ): Promise<KnotsResponse<PaymentMethod>> {
    try {
      const PaymentMethod =
        await this.paymentMethodService.update(
          id,
          paymentMethodDto,
        );
      if (!PaymentMethod) {
        throw new NotFoundException(
          `Payment Method with ID ${id} not found.`,
        );
      }
      return {
        message:
          'Payment Method updated successfully',
        data: PaymentMethod,
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
    deletedKnots: PaymentMethod | null;
  }> {
    try {
      const PaymentMethod =
        await this.paymentMethodService.delete(id);
      if (!PaymentMethod) {
        throw new NotFoundException(
          `Payment Method with ID ${id} not found.`,
        );
      }
      return {
        message: `Payment Method with ID ${id} has been deleted.`,
        deletedKnots: PaymentMethod,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<PaymentMethod[]> {
    const PaymentMethod =
      await this.paymentMethodService.getAll();
    return PaymentMethod;
  }
}
