import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class BillingGroupDto {
  
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  Monthinadvance: string;


  @IsNotEmpty()
  @IsString()
  Daytoexpiry: string;

  @IsNotEmpty()
  @IsString()
  TransmitterCode: string;

  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsNotEmpty()
  @IsString()
  Address: string;

  @IsNotEmpty()
  @IsString()
  PostalCode: string;


  @IsNotEmpty()
  @IsString()
  Common: string;

  @IsNotEmpty()
  @IsString()
  Province: string;

  @IsNotEmpty()
  @IsString()
  Telephone: string;

  @IsNotEmpty()
  @IsString()
  CrimeCode: string;

  @IsNotEmpty()
  @IsString()
  Bank: string;

  @IsNotEmpty()
  @IsString()
  IBAN: string;

  @IsNotEmpty()
  @IsString()
  PostalAccount: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  @IsString()
  VATNumber: string;

  @IsNotEmpty()
  @IsString()
  TaxIDCode: string;

  @IsNotEmpty()
  @IsString()
  SepaCodeCUC: string;

  @IsNotEmpty()
  @IsString()
  SepaCreditorCode: string;

  @IsNotEmpty()
  @IsString()
  DD1stUnpaidNotice: string;

  @IsNotEmpty()
  @IsString()
  DD2stUnpaidNotice: string;

  @IsNotEmpty()
  @IsString()
  GGServicesBlock: string;

  @IsNotEmpty()
  @IsString()
  Nation: string;

}


