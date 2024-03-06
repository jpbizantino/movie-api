import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  active: boolean;
}
