import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ClientDto {
  @IsNotEmpty()
  @IsString()
  customerType: string;

  @IsNotEmpty()
  @IsString()
  billingGroup: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  taxIDcode: string;

  @IsNotEmpty()
  @IsString()
  identityDocument: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsString()
  technicalDepartmentEmail:string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  pec: string;

  @IsNotEmpty()
  @IsNumber()
  sDICode: number;

  @IsNotEmpty()
  @IsNumber()
  mobilePhone: number;

  @IsNotEmpty()
  @IsNumber()
  landlinePhone: number;

  @IsNotEmpty()
  @IsBoolean()
  invoiceViaEmail: boolean;

  @IsNotEmpty()
  @IsBoolean()
  paperInvoice: boolean;

  @IsNotEmpty()
  @IsString()
  note: string;

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
  nation: string;

  @IsNotEmpty()
  @IsString()
  payment: string;

  @IsNotEmpty()
  @IsString()
  iBAN: string;

  @IsNotEmpty()
  @IsString()
  bICCode: string;

  @IsNotEmpty()
  @IsBoolean()
  differentBillingAddress: boolean;

  @IsNotEmpty()
  @IsBoolean()
  disableUnpaidInvoiceChecking: boolean;


}


