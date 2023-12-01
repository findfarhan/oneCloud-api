import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class InventionGridDto {
  
  @IsNotEmpty()
  @IsString()
  Supervisor: string;

  @IsNotEmpty()
  @IsString()
  Technician: string;

  @IsNotEmpty()
  @IsString()
  AppointmentDate: string;

  @IsNotEmpty()
  @IsString()
  AppointmentDuration: string;

  @IsNotEmpty()
  @IsString()
  Customer: string;

  @IsNotEmpty()
  @IsString()
  Service: string;

  @IsNotEmpty()
  @IsString()
  Priority: string;

  @IsNotEmpty()
  @IsString()
  Reminder: string;

  @IsNotEmpty()
  @IsString()
  Contacts: string;

  @IsNotEmpty()
  @IsString()
  Address: string;

  @IsNotEmpty()
  @IsString()
  EstimatedPrice: string;

  @IsNotEmpty()
  @IsBoolean()
  NotifyCustomer: boolean;



 
}


