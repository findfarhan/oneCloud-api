import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class NetMapDto {
  @IsNotEmpty()
  @IsString()
  svlanId: string;

  @IsNotEmpty()
  @IsString()
  clli: string;

  @IsNotEmpty()
  @IsString()
  svlanCode: string;

  @IsNotEmpty()
  @IsString()
  service: string;

  @IsNotEmpty()
  @IsNumber()
  startFrom :number

}


