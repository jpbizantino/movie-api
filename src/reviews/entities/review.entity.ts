import { ApiProperty } from '@nestjs/swagger';
import { Review } from '@prisma/client';

export class ReviewEntity implements Review {
  constructor(partial: Partial<ReviewEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  reviewId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  qualification: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
