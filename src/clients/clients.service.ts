import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const products = await Promise.all(
      createClientDto.products.map(title => this.preloadTagByName(title)),
    );

    const client = this.clientRepo.create({
      ...createClientDto,
        products
    });
    return this.clientRepo.save(client);
  }

  findAll() {
    return this.clientRepo.find( {
      relations: ['products'],
    });
  }

  findOne(id: string) {
    return this.clientRepo.findOne(id, {
      relations: ['products'],
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const products = updateClientDto.products && (
      await Promise.all(
        updateClientDto.products.map(title => this.preloadTagByName(title)))
    );

    const updateResult = await this.clientRepo.preload( {
      id: id,
      ...updateClientDto,
      products
    });

    if (!updateResult) {
      throw new EntityNotFoundError(Client, id);
    }
    return this.clientRepo.save(updateResult);
  }

  async remove(id: string) {
    const deleteResult = await this.clientRepo.delete(id);
    if (!deleteResult.affected) {
      throw new EntityNotFoundError(Client, id);
    }
  }

  private async preloadTagByName(products: Product): Promise<Product> {
    const product = await this.productRepo.findOne(products);

    if(product)
    {
      return product;

    }else {
      throw new HttpException('Produto não existe', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}