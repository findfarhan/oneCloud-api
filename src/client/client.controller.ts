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
import { ClientService } from './client.service';
import { ClientDto } from './dto';
import { Client } from './client.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

@Controller('client')
export class ClientControll {
  constructor(
    private clientService: ClientService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() clientDto: ClientDto,
  ): Promise<Client | null> {
    try {
      const user = await this.clientService.add(
        clientDto,
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
    @Body() clientDto: ClientDto, 
  ): Promise<Client | null> {
    try {
      const client =
        await this.clientService.update(
          id,
          clientDto,
        );
      if (!client) {
        throw new NotFoundException(
          `client with ID ${id} not found.`,
        );
      }
      return client;
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
  ): Promise<{ message: string; deletedClient: Client | null }> {
    try {
      const client = await this.clientService.delete(id);
      if (!client) {
        throw new NotFoundException(`client with ID ${id} not found.`);
      }
      return { message: `client with ID ${id} has been deleted.`, deletedClient: client };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @Get('/') 
  @UseGuards(AuthGuard) 
  async getAll(): Promise<Client[]> {
    const client = await this.clientService.getAll();
    return client;
  }
 
}
