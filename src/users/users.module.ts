import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RolesGuard } from 'src/roles/guards/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesPermissionsModule } from 'src/roles-permissions/roles-permissions.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, { provide: APP_GUARD, useClass: RolesGuard }],
  imports: [PrismaModule, RolesPermissionsModule],
  exports: [UsersService],
})
export class UsersModule {}
