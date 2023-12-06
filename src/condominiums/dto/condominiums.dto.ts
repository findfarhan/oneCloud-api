import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CondominiumsDto {
  @IsNotEmpty()
  @IsString()
  ipCpe: string;
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  referent: string;

  @IsNotEmpty()
  @IsString()
  accessPoint: string;


}


