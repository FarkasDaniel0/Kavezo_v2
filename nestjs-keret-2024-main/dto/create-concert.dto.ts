import { IsNotEmpty, IsDateString, IsInt, Min } from 'class-validator';
import 'reflect-metadata';

export class CreateConcertDto {
  @IsNotEmpty()
  performer: string;

  @IsDateString()
  startTime: string;

  @IsInt()
  @Min(1)
  duration: number;
}