import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class BundleDto {
  
  @IsNotEmpty()
  @IsString()
  Description: string;

 
}


