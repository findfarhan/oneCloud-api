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
import { ProviderService } from './provider.service';
import { ProviderDto } from './dto';
import { Provider } from './provider.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

@Controller('provider')
export class ProviderController {
  constructor(
    private providerService: ProviderService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() providerDto: ProviderDto,
  ): Promise<Provider | null> {
    try {
      const user = await this.providerService.add(
        providerDto,
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
    @Body() providerDto: ProviderDto, 
  ): Promise<Provider | null> {
    try {
      const passiveInvoice =
        await this.providerService.update(
          id,
          providerDto,
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
  ): Promise<{ message: string; deletedPartner: Provider | null }> {
    try {
      const passiveInvoice = await this.providerService.delete(id);
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
  async getAll(): Promise<Provider[]> {
    const passiveInvoice = await this.providerService.getAll();
    return passiveInvoice;
  }
 
}
