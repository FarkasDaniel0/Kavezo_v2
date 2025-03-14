import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConcertsService } from './concerts.service';
import { ConcertsController } from './concerts.controller';
import { PrismaClient } from '@prisma/client';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  providers: [
    PrismaService,
    ConcertsService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  controllers: [ConcertsController],
})
export class AppModule {}