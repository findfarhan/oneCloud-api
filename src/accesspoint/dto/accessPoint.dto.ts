import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AccessPointDto {
  @IsNotEmpty()
  @IsString()
  ipAccessPoint: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nas: string;

  @IsNotEmpty()
  @IsString()
  node: string;


}


