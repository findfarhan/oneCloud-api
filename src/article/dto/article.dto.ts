import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ArticleDto {
  
  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsNotEmpty()
  @IsNumber()
  Price: number;

 
}


