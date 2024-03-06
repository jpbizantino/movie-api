import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { RolesPermissionsModule } from 'src/roles-permissions/roles-permissions.module';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
  imports: [PrismaModule, RolesPermissionsModule],
  exports: [PermissionsService],
})
export class PermissionsModule {}
