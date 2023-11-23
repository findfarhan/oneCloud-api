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
  firstName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  referent: string;

  @IsNotEmpty()
  @IsString()
  ap: string;

  @IsNotEmpty()
  @IsString()
  node: string;

  @IsNotEmpty()
  @IsString()
  client: string;

}


