// A koncertek kezelését végző service osztály
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateConcertDto } from '../dto/create-concert.dto';
import { UpdateConcertDto } from '../dto/update-concert.dto';

@Injectable()
export class ConcertsService {
  // PrismaService injektálása konstruktorban
  constructor(private prisma: PrismaService) {}

  // Összes koncert lekérése
  async getAll() {
    return this.prisma.concert.findMany();
  }

  // Új koncert létrehozása
  async create(data: CreateConcertDto) {
    // Kötelező mezők ellenőrzése
    if (!data.performer || !data.startTime || !data.duration) {
      throw new BadRequestException('Minden mező kitöltése kötelező!');
    }
    // Kezdési időpont ellenőrzése (nem lehet múltbeli)
    if (new Date(data.startTime) < new Date()) {
      throw new BadRequestException('A kezdési idő nem lehet a múltban!');
    }
    // Időtartam ellenőrzése (pozitív szám kell legyen)
    if (data.duration <= 0) {
      throw new BadRequestException('Az időtartamnak legalább 1 percnek kell lennie!');
    }
    // Koncert létrehozása az adatbázisban
    return this.prisma.concert.create({
      data: {
        performer: data.performer,
        startTime: new Date(data.startTime),
        duration: data.duration,
        cancelled: false,
      },
    });
  }

  // Koncert adatainak módosítása
  async update(id: number, data: UpdateConcertDto) {
    // Kezdési időpont ellenőrzése, ha módosítva lett
    if (data.startTime && new Date(data.startTime) < new Date()) {
      throw new BadRequestException('A kezdési idő nem lehet a múltban!');
    }
    // Időtartam ellenőrzése, ha módosítva lett
    if (data.duration !== undefined && data.duration <= 0) {
      throw new BadRequestException('Az időtartamnak legalább 1 percnek kell lennie!');
    }
    // Koncert adatainak frissítése az adatbázisban
    return this.prisma.concert.update({
      where: { id },
      data: {
        ...(data.performer !== undefined && { performer: data.performer }),
        ...(data.startTime !== undefined && { startTime: new Date(data.startTime) }),
        ...(data.duration !== undefined && { duration: data.duration }),
        ...(data.cancelled !== undefined && { cancelled: data.cancelled }),
      },
    });
  }
}
