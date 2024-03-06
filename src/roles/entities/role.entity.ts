import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class RoleEntity implements Role {
  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  @ApiProperty()
  roleId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
