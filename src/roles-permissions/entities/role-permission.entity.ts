import { ApiProperty } from '@nestjs/swagger';
import { RolePermission } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { PermissionEntity } from 'src/permissions/entities/permission.entity';
import { RoleEntity } from 'src/roles/entities/Role.entity';

export class RolePermissionEntity implements RolePermission {
  constructor(partial: Partial<RolePermissionEntity>) {
    Object.assign(this, partial);
  }
  // @Exclude()
  @ApiProperty()
  roleId: string;

  // @Exclude()
  @ApiProperty()
  permissionId: string;

  @ApiProperty()
  role: Partial<RoleEntity>;

  @ApiProperty()
  permission: Partial<PermissionEntity>;
}
