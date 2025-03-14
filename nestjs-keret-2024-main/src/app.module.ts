import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConcertsService } from './concerts.service';
import { ConcertsController } from './concerts.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [PrismaService, ConcertsService],
  controllers: [ConcertsController],
})
export class AppModule {}