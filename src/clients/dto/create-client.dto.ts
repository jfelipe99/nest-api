import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Client } from "../entities/client.entity";
import { Product } from "../entities/product.entity";

export class CreateClientDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    products: Product[];
}
