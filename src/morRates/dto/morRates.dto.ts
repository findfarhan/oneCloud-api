import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class MorRatesDto {
 
  @IsNotEmpty()
  @IsString()
  BackendDescription: string;

  @IsNotEmpty()
  @IsString()
  Descriptioninvoice: string;

  @IsNotEmpty()
  @IsString()
  MORID: string;

  @IsNotEmpty()
  @IsString()
  Service: string;

  @IsNotEmpty()
  @IsString()
  CommunicationCode: string;

  @IsNotEmpty()
  @IsString()
  Isnap: string;

  @IsNotEmpty()
  @IsString()
  ITfixed: string;

  @IsNotEmpty()
  @IsString()
  ITfurniture: string;

@IsNotEmpty()
  @IsString()
  FixedEU: string;

  @IsNotEmpty()
  @IsString()
  EUfurniture: string;

  @IsNotEmpty()
  @IsString()
  FixedWorld: string;

  @IsNotEmpty()
  @IsString()
  WorldFurniture: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

 
}


