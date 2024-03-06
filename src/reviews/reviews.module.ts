import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesPermissionsModule } from 'src/roles-permissions/roles-permissions.module';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [PrismaModule, RolesPermissionsModule],
  exports: [ReviewsService],
})
export class ReviewsModule {}
