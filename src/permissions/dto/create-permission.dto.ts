import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
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
