import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class NASDto {
  
  @IsNotEmpty()
  @IsString()
  ipNas: string;

  @IsNotEmpty()
  @IsString()
  node: string;

 
}


