import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { ConcertsService } from './concerts.service';

@Controller('concerts')
export class ConcertsController {
  constructor(private concertsService: ConcertsService) {}

  @Get()
  async getAll() {
    return this.concertsService.getAll();
  }

  @Post()
  async create(@Body() data) {
    return this.concertsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data) {
    return this.concertsService.update(Number(id), data);
  }
}