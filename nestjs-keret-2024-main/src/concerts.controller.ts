// Szükséges NestJS dekorátorok és segédeszközök importálása
import { Controller, Get, Post, Patch, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from '../dto/create-concert.dto';

// A 'concerts' végpont kontrollerének definíciója
@Controller('concerts')
export class ConcertsController {
  // ConcertsService injektálása konstruktor függőség befecskendezéssel
  constructor(private concertsService: ConcertsService) {}

  // GET kérések kezelése a /concerts végponton - minden koncert lekérése
  @Get()
  async getAll() {
    return this.concertsService.getAll();
  }

  // POST kérések kezelése a /concerts végponton - új koncert létrehozása
  // A beérkező adatok validálása a CreateConcertDto séma alapján
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CreateConcertDto) {
    return this.concertsService.create(data);
  }

  // PATCH kérések kezelése a /concerts/:id végponton - meglévő koncert módosítása
  // Az :id paraméter határozza meg, melyik koncertet kell módosítani
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data) {
    return this.concertsService.update(Number(id), data);
  }
}
