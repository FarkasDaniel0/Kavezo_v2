import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ConcertsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.concert.findMany();
  }

  async create(data) {
    return this.prisma.concert.create({ data });
  }

  async update(id: number, data) {
    return this.prisma.concert.update({ where: { id }, data });
  }
}