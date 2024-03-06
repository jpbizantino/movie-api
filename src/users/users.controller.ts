import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/roles/decorators/role.decorator';
import { Permissions } from 'src/permissions/decorators/permission.decorator';
import { RoleEnum } from 'src/roles/enums/role.enum';
import { RolesGuard } from 'src/roles/guards/role.guard';
import { PermissionEnum } from 'src/permissions/enums/permission.enum';
import { RolePermissionsGuard } from 'src/roles-permissions/guards/roles-permission.guard';
import { UpdateUserRolesDto } from './dto/update-user-role.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  // Roles
  @Roles(RoleEnum.ADMIN, RoleEnum.EDITOR)
  // Permissions
  @Permissions(PermissionEnum.READ)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':userId')
  // Roles
  @Roles(RoleEnum.ADMIN, RoleEnum.EDITOR)
  // Permissions
  @Permissions(PermissionEnum.READ)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    return await this.usersService.findOne(userId);
  }

  @Get('/profile/:userId')
  // Roles
  @Roles(RoleEnum.ADMIN, RoleEnum.EDITOR, RoleEnum.BASIC)
  // Permissions
  @Permissions(PermissionEnum.READ)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async getProfile(@Param('userId', ParseUUIDPipe) userId: string) {
    return await this.usersService.getProfile(userId);
  }

  @Patch(':userId')
  // Roles
  @Roles(RoleEnum.ADMIN, RoleEnum.EDITOR, RoleEnum.BASIC)
  // Permissions
  @Permissions(PermissionEnum.EDIT)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(userId, updateUserDto);
  }

  @Patch('roles/:userId')
  // Roles
  @Roles(RoleEnum.ADMIN)
  // Permissions
  @Permissions(PermissionEnum.EDIT)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async updateRoles(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() updateUserRolesDto: UpdateUserRolesDto,
  ) {
    return await this.usersService.updateRoles(userId, updateUserRolesDto);
  }

  @Delete(':userId')
  // Roles
  @Roles(RoleEnum.ADMIN)
  // Permissions
  @Permissions(PermissionEnum.DELETE)
  //Guards
  @UseGuards(JwtAuthGuard, RolesGuard, RolePermissionsGuard)
  //
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('userId', ParseUUIDPipe) userId: string) {
    return await this.usersService.remove(userId);
  }
}
