import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewEntity } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto): Promise<ReviewEntity> {
    return new ReviewEntity(
      new ReviewEntity(
        await this.prisma.review.create({
          data: {
            title: createReviewDto.title,
            content: createReviewDto.content,
            qualification: createReviewDto.qualification,
          },
        }),
      ),
    );
  }

  async findAll(): Promise<ReviewEntity[]> {
    const list = await this.prisma.review.findMany();

    return list.map((item) => new ReviewEntity(item));
  }

  // async findByUserId(userId: string): Promise<ReviewEntity[]> {
  //   const list = await this.prisma.review.findMany({
  //     where: { users: { every: { userId: userId } } },
  //   });

  //   return list.map((item) => new ReviewEntity(item));
  // }

  async findOne(id: string): Promise<ReviewEntity> {
    return new ReviewEntity(
      await this.prisma.review.findUnique({
        where: { reviewId: id },
      }),
    );
  }

  async update(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewEntity> {
    return new ReviewEntity(
      await this.prisma.review.update({
        where: { reviewId: id },
        data: {
          title: updateReviewDto.title,
          content: updateReviewDto.content,
          qualification: updateReviewDto.qualification,
        },
      }),
    );
  }

  async remove(id: string): Promise<ReviewEntity> {
    return new ReviewEntity(
      await this.prisma.review.delete({
        where: { reviewId: id },
      }),
    );
  }
}
