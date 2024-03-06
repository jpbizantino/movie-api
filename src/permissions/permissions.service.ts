import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity } from './entities/Permission.entity';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createPermissionDto: CreatePermissionDto,
  ): Promise<PermissionEntity> {
    return new PermissionEntity(
      new PermissionEntity(
        await this.prisma.permission.create({
          data: {
            name: createPermissionDto.name,
            code: createPermissionDto.code,
            active: createPermissionDto.active,
          },
        }),
      ),
    );
  }

  async findAll(): Promise<PermissionEntity[]> {
    const list = await this.prisma.permission.findMany();

    return list.map((item) => new PermissionEntity(item));
  }

  async findOne(id: string): Promise<PermissionEntity> {
    return new PermissionEntity(
      await this.prisma.permission.findUnique({
        where: { permissionId: id },
      }),
    );
  }

  async findByCode(code: string): Promise<PermissionEntity> {
    return new PermissionEntity(
      await this.prisma.permission.findUnique({
        where: { code: code },
      }),
    );
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<PermissionEntity> {
    return new PermissionEntity(
      await this.prisma.permission.update({
        where: { permissionId: id },
        data: {
          name: updatePermissionDto.name,
          code: updatePermissionDto.code,
          active: updatePermissionDto.active,
        },
      }),
    );
  }

  async remove(id: string): Promise<PermissionEntity> {
    return new PermissionEntity(
      await this.prisma.permission.delete({
        where: { permissionId: id },
      }),
    );
  }
}
