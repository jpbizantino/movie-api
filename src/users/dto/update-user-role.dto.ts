import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { RoleEntity } from 'src/roles/entities/Role.entity';

export class UpdateUserRolesDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  roles: RoleEntity[];
}
