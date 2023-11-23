import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class KnotsDto {
  
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

 
}


