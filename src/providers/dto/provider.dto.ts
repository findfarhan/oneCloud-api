import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ProviderDto {
  @IsNotEmpty()
  @IsString()
  supplierType: string;

  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @IsString()
  vatNumber: string;

  @IsNotEmpty()
  @IsString()
  attorney: string;

  @IsNotEmpty()
  @IsString()
  representativeTaxCode: string;

  @IsNotEmpty()
  @IsString()
  taxIdCode: string;

  @IsNotEmpty()
  @IsString()
  identityDocument: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  pec: string;

  @IsNotEmpty()
  @IsNumber()
  mobilePhone: number;

  @IsNotEmpty()
  @IsNumber()
  landlinePhone: number;

  @IsNotEmpty()
  @IsNumber()
  totalTaxableAmount: number;

  @IsNotEmpty()
  @IsEmail()
  emailNOC: string;

  @IsNotEmpty()
  @IsBoolean()
  enableTicketSending: boolean;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  civic: string;

  @IsNotEmpty()
  @IsString()
  common: string;

  @IsNotEmpty()
  @IsString()
  province: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  payment: string;

  @IsNotEmpty()
  @IsString()
  iBAN: string;



}


