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
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity } from './entities/Permission.entity';
import { PermissionsService } from './permissions.service';
import { Roles } from 'src/roles/decorators/role.decorator';
import { RolesGuard } from 'src/roles/guards/role.guard';
import { RolePermissionsGuard } from 'src/roles-permissions/guards/roles-permission.guard';
import { RoleEnum } from 'src/roles/enums/role.enum';
import { PermissionEnum } from './enums/permission.enum';
import { Permissions } from 'src/permissions/decorators/permission.decorator';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly PermissionService: PermissionsService) {}

  @Post()
  // Roles
  @Roles(RoleEnum.ADMIN)
  // Permissions
  @Permissions(PermissionEnum.CREATE)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PermissionEntity })
  async create(@Body() createPermissionsDto: CreatePermissionDto) {
    return await this.PermissionService.create(createPermissionsDto);
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
  @ApiOkResponse({ type: PermissionEntity, isArray: true })
  async findAll() {
    return await this.PermissionService.findAll();
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
  @ApiOkResponse({ type: PermissionEntity })
  async findOne(@Param('id') id: string) {
    return await this.PermissionService.findOne(id);
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
  @ApiCreatedResponse({ type: PermissionEntity })
  async update(
    @Param('id') id: string,
    @Body() updatePermissionsDto: UpdatePermissionDto,
  ) {
    return await this.PermissionService.update(id, updatePermissionsDto);
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
  @ApiParam({ name: 'id', description: 'Permissions Id' })
  @ApiOkResponse({ type: PermissionEntity })
  async remove(@Param('id') id: string) {
    return await this.PermissionService.remove(id);
  }
}
