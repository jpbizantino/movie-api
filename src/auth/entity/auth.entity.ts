import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';
import { RoleEntity } from 'src/roles/entities/Role.entity';

export class AuthEntity {
  @ApiProperty()
  user: UserEntity | null;

  @ApiProperty()
  token: string;

  @ApiProperty({ isArray: true })
  roles: RoleEntity[];
}
