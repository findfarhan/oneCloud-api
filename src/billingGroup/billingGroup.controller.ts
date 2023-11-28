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
import { BillingGroupService } from './billingGroup.service';
import { BillingGroupDto } from './dto';
import { BillingGroup } from './billingGroup.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

interface KnotsResponse<T> {
  message: string;
  data: T;
}

@Controller('billingGroup')
export class BillingGroupController {
  constructor(
    private billingGroupService: BillingGroupService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() billingGroupDto: BillingGroupDto,
  ): Promise<KnotsResponse<BillingGroup>> {
    try {
      const user =
        await this.billingGroupService.add(
          billingGroupDto,
        );

      return {
        message:
          'Billing Group added successfully',
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
    @Body() billingGroupDto: BillingGroupDto,
  ): Promise<KnotsResponse<BillingGroup>> {
    try {
      const BillingGroup =
        await this.billingGroupService.update(
          id,
          billingGroupDto,
        );
      if (!BillingGroup) {
        throw new NotFoundException(
          `Billing Group with ID ${id} not found.`,
        );
      }
      return {
        message:
          'Billing Group updated successfully',
        data: BillingGroup,
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
    deletedKnots: BillingGroup | null;
  }> {
    try {
      const BillingGroup =
        await this.billingGroupService.delete(id);
      if (!BillingGroup) {
        throw new NotFoundException(
          `Billing Group with ID ${id} not found.`,
        );
      }
      return {
        message: `Billing Group with ID ${id} has been deleted.`,
        deletedKnots: BillingGroup,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async getAll(): Promise<BillingGroup[]> {
    const BillingGroup =
      await this.billingGroupService.getAll();
    return BillingGroup;
  }
}
