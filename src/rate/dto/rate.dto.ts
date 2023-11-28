import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class RateDto {
  
  @IsNotEmpty()
  @IsString()
  Rate: string;

  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsNotEmpty()
  @IsString()
  Nature: string;

  @IsNotEmpty()
  @IsBoolean()
  Default: boolean;

 
}


