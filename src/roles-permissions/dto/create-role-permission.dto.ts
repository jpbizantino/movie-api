import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRolePermissionDto {
  @IsNotEmpty()
  @ApiProperty()
  roleId: string;

  @IsNotEmpty()
  @ApiProperty()
  permissionId: string;
}
