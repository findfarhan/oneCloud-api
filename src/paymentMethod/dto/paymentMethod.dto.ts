import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class PaymentMethodDto {
  
  @IsNotEmpty()
  @IsString()
  CommunicationCode: string;

  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsNotEmpty()
  @IsString()
  InvoiceCodeEl: string;

  @IsNotEmpty()
  @IsString()
  BillingNotes: string;

  @IsNotEmpty()
  @IsString()
  Unpaidtext: string;
}


