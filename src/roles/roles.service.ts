import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-Role.dto';
import { UpdateRoleDto } from './dto/update-Role.dto';
import { RoleEntity } from './entities/Role.entity';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return new RoleEntity(
      new RoleEntity(
        await this.prisma.role.create({
          data: {
            name: createRoleDto.name,
            code: createRoleDto.code,
            active: createRoleDto.active,
          },
        }),
      ),
    );
  }

  async findAll(): Promise<RoleEntity[]> {
    const list = await this.prisma.role.findMany();

    return list.map((item) => new RoleEntity(item));
  }

  async findByUserId(userId: string): Promise<RoleEntity[]> {
    const list = await this.prisma.role.findMany({
      where: { users: { some: { userId: userId } } },
    });

    return list.map((item) => new RoleEntity(item));
  }

  async findOne(id: string): Promise<RoleEntity> {
    return new RoleEntity(
      await this.prisma.role.findUnique({
        where: { roleId: id },
      }),
    );
  }

  async findByCode(code: string): Promise<RoleEntity> {
    return new RoleEntity(
      await this.prisma.role.findUnique({
        where: { code: code },
      }),
    );
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
    return new RoleEntity(
      await this.prisma.role.update({
        where: { roleId: id },
        data: {
          name: updateRoleDto.name,
          code: updateRoleDto.code,
          active: updateRoleDto.active,
        },
      }),
    );
  }

  async remove(id: string): Promise<RoleEntity> {
    return new RoleEntity(
      await this.prisma.role.delete({
        where: { roleId: id },
      }),
    );
  }
}
