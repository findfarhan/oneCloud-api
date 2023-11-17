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
import { TicketService } from './ticket.service';
import { TicketDto } from './dto';
import { Ticket } from './ticket.entity';
import { AuthGuard } from 'src/middleware/authGuad.middleware';

@Controller('ticketManagment')
export class TicketController {
  constructor(
    private ticketService: TicketService,
  ) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async add(
    @Body() ticketDto: TicketDto,
  ): Promise<Ticket | null> {
    try {
      const user = await this.ticketService.add(
        ticketDto,
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
    @Body() ticketDto: TicketDto, 
  ): Promise<Ticket | null> {
    try {
      const ticket =
        await this.ticketService.update(
          id,
          ticketDto,
        );
      if (!ticket) {
        throw new NotFoundException(
          `ticket with ID ${id} not found.`,
        );
      }
      return ticket;
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
  ): Promise<{ message: string; deletedTicket: Ticket | null }> {
    try {
      const ticket = await this.ticketService.delete(id);
      if (!ticket) {
        throw new NotFoundException(`ticket with ID ${id} not found.`);
      }
      return { message: `ticket with ID ${id} has been deleted.`, deletedTicket: ticket };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @Get('/') 
  @UseGuards(AuthGuard) 
  async getAll(): Promise<Ticket[]> {
    const ticket = await this.ticketService.getAll();
    return ticket;
  }
 
}
