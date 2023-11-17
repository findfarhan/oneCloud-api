import {
  Injectable,
} from '@nestjs/common';
import {
  TicketDto
} from './dto';
import { Ticket } from './ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly userRepository: Repository<Ticket>,
  ) {}

  async add(
    ticketDto: TicketDto,
  ): Promise<any> {
    const {
      customer,
      service,
      ticketType,
      reasonForRequest,
      assignTo,
      priority,
      description,
      ticketVisibleByCustomer,
      addDescriptionForCustomer,
      descriptionForCustomer,
      closeTicketDueToInactivity,
     
    } = ticketDto;

    const user = this.userRepository.create({
      customer,
      service,
      ticketType,
      reasonForRequest,
      assignTo,
      priority,
      description,
      ticketVisibleByCustomer,
      addDescriptionForCustomer,
      descriptionForCustomer,
      closeTicketDueToInactivity
    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, ticketDto: TicketDto,): Promise<Ticket | null> {

    const ticket = await this.userRepository.findOne({ where: { id: id } });

    if (!ticket) {
      return null; 
    }

    ticket.customer = ticketDto.customer;
    ticket.service = ticketDto.service;
    ticket.ticketType = ticketDto.ticketType;
    ticket.reasonForRequest = ticketDto.reasonForRequest;
    ticket.assignTo = ticketDto.assignTo;
    ticket.priority = ticketDto.priority;
    ticket.description = ticketDto.description;
    ticket.ticketVisibleByCustomer = ticketDto.ticketVisibleByCustomer;
    ticket.addDescriptionForCustomer = ticketDto.addDescriptionForCustomer;
    ticket.descriptionForCustomer = ticketDto.descriptionForCustomer;
    ticket.closeTicketDueToInactivity = ticketDto.closeTicketDueToInactivity;
   

    const updatedTicket = await this.userRepository.save(ticket);
    return updatedTicket;
    

  }

  async delete(id: string): Promise<Ticket | null> {

    const ticket = await this.userRepository.findOne({ where: { id: id } });

    if (!ticket) {
      return null; 
    }
    
   await this.userRepository.remove(ticket);  
   return ticket  

  }

  async getAll(): Promise<Ticket[]> {
    const ticket = await this.userRepository.find();
    return ticket;
  }
}
