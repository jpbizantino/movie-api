import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesController } from './roles.controller';
import { RolesPermissionsModule } from 'src/roles-permissions/roles-permissions.module';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [PrismaModule, RolesPermissionsModule],
  exports: [RolesService],
})
export class RolesModule {}
