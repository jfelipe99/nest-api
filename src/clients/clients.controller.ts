import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ValidationPipe, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/auth/jwt.guard';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@UseGuards(JwtGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body(new ValidationPipe({errorHttpStatusCode: 422})) createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  
  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe({errorHttpStatusCode: 422})) updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
