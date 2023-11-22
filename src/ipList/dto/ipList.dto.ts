import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class IpListDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  startIp: string;

  @IsNotEmpty()
  @IsString()
  network: string;

  @IsNotEmpty()
  @IsString()
  startIp1: string;

  @IsNotEmpty()
  @IsString()
  reservedIps: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

}


