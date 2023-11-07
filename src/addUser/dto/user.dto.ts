// registration.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class AddUserDto {
  @IsNotEmpty()
  @IsString()
  service: string;

  @IsNotEmpty()
  @IsString()
  customer: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  billing: string;

  @IsNotEmpty()
  @IsString()
  issue: string;

}
