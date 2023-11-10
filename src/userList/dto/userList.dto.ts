import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AddUserListDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  partner: string;

  @IsNotEmpty()
  @IsString()
  password: string;

}


