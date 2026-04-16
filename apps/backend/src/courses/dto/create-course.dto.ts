import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Introduction à JavaScript' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Un cours complet pour débutants' })
  @IsString()
  description: string;

  @ApiProperty({ example: 49.99, required: false })
  @IsOptional()
  @IsNumber()
  price?: number;
}
