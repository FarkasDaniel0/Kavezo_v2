import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsDateString, IsInt, Min, IsBoolean, IsOptional } from 'class-validator';

export class UpdateConcertDto {
  
  @IsNotEmpty()
  performer?: string;

  
  @IsDateString()
  startTime?: string;

  
  @IsInt()
  @Min(1)
  duration?: number;

  
  @IsBoolean()
  cancelled?: boolean;
}