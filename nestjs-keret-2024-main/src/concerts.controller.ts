import { Controller, Get, Post, Patch, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from '../dto/create-concert.dto';

@Controller('concerts')
export class ConcertsController {
  constructor(private concertsService: ConcertsService) {}

  @Get()
  async getAll() {
    return this.concertsService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CreateConcertDto) {
    return this.concertsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data) {
    return this.concertsService.update(Number(id), data);
  }
}
