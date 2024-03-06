import { ApiProperty } from '@nestjs/swagger';
import { Permission } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class PermissionEntity implements Permission {
  constructor(partial: Partial<PermissionEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  @ApiProperty()
  permissionId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  active: boolean;
}
