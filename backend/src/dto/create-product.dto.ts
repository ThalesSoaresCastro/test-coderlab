import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsArray()
  categories?: string[];

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  qty: number;

  @IsNumber()
  price: number;

  @IsString()
  photo: string;
}