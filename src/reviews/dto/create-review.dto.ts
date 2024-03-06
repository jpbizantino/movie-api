import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  qualification: number;
}
