import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class AddPartnerDto {
  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @IsString()
  contactSurname: string;

  @IsNotEmpty()
  @IsString()
  contactName: string;

  @IsNotEmpty()
  @IsNumber()
  landlineTel: number;

  @IsNotEmpty()
  @IsNumber()
  telMobile: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  code: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}


