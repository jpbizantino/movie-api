import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesPermissionsController } from './roles-permissions.controller';
import { RolesPermissionsService } from './roles-permissions.service';

@Module({
  controllers: [RolesPermissionsController],
  providers: [RolesPermissionsService],
  imports: [PrismaModule, RolesPermissionsModule],
  exports: [RolesPermissionsService],
})
export class RolesPermissionsModule {}
