import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    image: string;

    @IsString()
    brand: string;

    @IsNumber()
    price: number;
    
    @IsString()
    @IsNotEmpty()
    title: string;
}