import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class PassiveInvoiceDto {
  @IsNotEmpty()
  @IsString()
  supplierCompanyName: string;

  @IsNotEmpty()
  @IsBoolean()
  crediteNote: boolean;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsString()
  issueDate: string;

  @IsNotEmpty()
  @IsString()
  expireDate: string;

  @IsNotEmpty()
  @IsNumber()
  totalExcluding: number;

  @IsNotEmpty()
  @IsNumber()
  totalNotSubject: number;

  @IsNotEmpty()
  @IsNumber()
  totalNonTaxable: number;

  @IsNotEmpty()
  @IsNumber()
  totalExempt: number;

  @IsNotEmpty()
  @IsNumber()
  totalNotShown: number;

  @IsNotEmpty()
  @IsNumber()
  totalReverseCharge: number;

  @IsNotEmpty()
  @IsNumber()
  totalEUCountry: number;

  @IsNotEmpty()
  @IsNumber()
  totalTaxableAmount: number;

  @IsNotEmpty()
  @IsNumber()
  totalVAT: number;

  @IsNotEmpty()
  @IsNumber()
  totalDocument: number;

  @IsNotEmpty()
  @IsString()
  payment: string;

  @IsNotEmpty()
  @IsString()
  note: string;

}


