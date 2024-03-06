import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { CreateRoleDto } from './dto/create-Role.dto';
import { UpdateRoleDto } from './dto/update-Role.dto';
import { RoleEntity } from './entities/Role.entity';
import { RolesService } from './roles.service';
import { Roles } from 'src/roles/decorators/role.decorator';
import { RolesGuard } from 'src/roles/guards/role.guard';
import { RolePermissionsGuard } from 'src/roles-permissions/guards/roles-permission.guard';
import { RoleEnum } from 'src/roles/enums/role.enum';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
import { PermissionEnum } from 'src/permissions/enums/permission.enum';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly RoleService: RolesService) {}

  @Post()
  // Roles
  @Roles(RoleEnum.ADMIN)
  // Permissions
  @Permissions(PermissionEnum.CREATE)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: RoleEntity })
  async create(@Body() createRolesDto: CreateRoleDto) {
    return await this.RoleService.create(createRolesDto);
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
  @ApiOkResponse({ type: RoleEntity, isArray: true })
  async findAll() {
    return await this.RoleService.findAll();
  }

  @Get(':id')
  // Roles
  @Roles(RoleEnum.ADMIN)
  // Permissions
  @Permissions(PermissionEnum.READ)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Role Id' })
  @ApiOkResponse({ type: RoleEntity })
  async findOne(@Param('id') id: string) {
    return await this.RoleService.findOne(id);
  }

  @Patch(':id')
  // Roles
  @Roles(RoleEnum.ADMIN)
  // Permissions
  @Permissions(PermissionEnum.EDIT)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Role Id' })
  @ApiCreatedResponse({ type: RoleEntity })
  async update(@Param('id') id: string, @Body() updateRolesDto: UpdateRoleDto) {
    return await this.RoleService.update(id, updateRolesDto);
  }

  @Delete(':id')
  // Roles
  @Roles(RoleEnum.ADMIN)
  // Permissions
  @Permissions(PermissionEnum.DELETE)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Role Id' })
  @ApiOkResponse({ type: RoleEntity })
  async remove(@Param('id') id: string) {
    return await this.RoleService.remove(id);
  }
}
