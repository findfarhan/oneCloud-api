import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class TicketDto {
  @IsNotEmpty()
  @IsString()
  customer: string;

  @IsNotEmpty()
  @IsString()
  service: string;


  @IsNotEmpty()
  @IsString()
  ticketType: string;

  @IsNotEmpty()
  @IsString()
  reasonForRequest: string;

  @IsNotEmpty()
  @IsString()
  assignTo: string;

  @IsNotEmpty()
  @IsString()
  priority: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  ticketVisibleByCustomer: boolean;

  @IsNotEmpty()
  @IsBoolean()
  addDescriptionForCustomer: boolean;

  @IsNotEmpty()
  @IsString()
  descriptionForCustomer: string;

  @IsNotEmpty()
  @IsNumber()
  closeTicketDueToInactivity: number;

  
}


