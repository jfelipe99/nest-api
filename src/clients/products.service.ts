/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(
   
        @InjectRepository(Product)
        private productRepo: Repository<Product>,
      ) {}

      async create(createProductDto: CreateProductDto) {
   
        const product = this.productRepo.create(createProductDto);
        return this.productRepo.save(product);
      }
    
      findAll() {
        return this.productRepo.find();
      }
    
      findOne(id: string) {         
        return this.productRepo.findOne(id);
      }
}
