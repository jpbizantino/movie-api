import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { RolesPermissionsService } from './roles-permissions.service';
import { RoleEnum } from 'src/roles/enums/role.enum';
import { Roles } from 'src/roles/decorators/role.decorator';
import { PermissionEnum } from 'src/permissions/enums/permission.enum';
import { RolesGuard } from 'src/roles/guards/role.guard';
import { RolePermissionsGuard } from './guards/roles-permission.guard';
import { Permissions } from 'src/permissions/decorators/permission.decorator';

@ApiTags('roles-permissions')
@Controller('roles-permissions')
export class RolesPermissionsController {
  constructor(
    private readonly RolePermissionService: RolesPermissionsService,
  ) {}

  @Post()
  // Roles
  @Roles(RoleEnum.ADMIN)
  // Permissions
  @Permissions(PermissionEnum.CREATE)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: RolePermissionEntity })
  async create(@Body() createRolePermissionsDto: CreateRolePermissionDto) {
    return await this.RolePermissionService.create(createRolePermissionsDto);
  }

  @Get()
  // Roles
  @Roles(RoleEnum.ADMIN)
  // Permissions
  @Permissions(PermissionEnum.READ)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiOkResponse({ type: RolePermissionEntity, isArray: true })
  async findAll() {
    return await this.RolePermissionService.findAll();
  }

  @Get('byUser/:id')
  // Roles
  @Roles(RoleEnum.ADMIN)
  // Permissions
  @Permissions(PermissionEnum.READ)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiOkResponse({ type: RolePermissionEntity })
  @ApiParam({ name: 'id', description: 'User Sd' })
  async findByUserId(@Param('id') id: string) {
    console.log('entro acaa');
    return await this.RolePermissionService.findByUserId(id);
  }

  @Delete(':roleId/:permissionId')
  // Roles
  @Roles(RoleEnum.ADMIN)
  // Permissions
  @Permissions(PermissionEnum.DELETE)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiParam({ name: 'roleId', description: 'Role Id' })
  @ApiParam({ name: 'permissionId', description: 'Permissions Id' })
  @ApiOkResponse({ type: RolePermissionEntity })
  async remove(
    @Param('roleId') roleId: string,
    @Param('permissionId') permissionId: string,
  ) {
    return await this.RolePermissionService.remove(roleId, permissionId);
  }
}
