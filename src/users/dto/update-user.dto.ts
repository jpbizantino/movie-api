import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  username?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty()
  email?: string;
}
