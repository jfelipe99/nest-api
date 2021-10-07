/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from 'src/auth/auth/jwt.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@UseGuards(JwtGuard)
@Controller('api/product')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body(new ValidationPipe({errorHttpStatusCode: 422})) createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
