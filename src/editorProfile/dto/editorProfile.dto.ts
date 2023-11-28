import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class EditoProfileDto {
  
  @IsNotEmpty()
  @IsString()
  BackendDescription: string;

  @IsNotEmpty()
  @IsString()
  Descriptioninvoice: string;

  @IsNotEmpty()
  @IsString()
  Service: string;

  @IsNotEmpty()
  @IsString()
  Type: string;

  @IsNotEmpty()
  @IsString()
  LineTechnicalProfile: string;

  @IsNotEmpty()
  @IsString()
  BandPeakDown: string;

  @IsNotEmpty()
  @IsString()
  BandaPiccoUP: string;

  @IsNotEmpty()
  @IsString()
  PriceMonthly: string;

@IsNotEmpty()
  @IsString()
  RadiusServiceId: string;

  @IsNotEmpty()
  @IsString()
  CommunicationCode: string;

  @IsNotEmpty()
  @IsString()
  Partner: string;

  @IsNotEmpty()
  @IsBoolean()
  Business: boolean;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;


 
}


