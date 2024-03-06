import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { RolePermissionEntity } from './entities/role-permission.entity';

@Injectable()
export class RolesPermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createRolesPermissionDto: CreateRolePermissionDto,
  ): Promise<RolePermissionEntity> {
    return new RolePermissionEntity(
      new RolePermissionEntity(
        await this.prisma.rolePermission.create({
          data: createRolesPermissionDto,
        }),
      ),
    );
  }

  async findAll(): Promise<RolePermissionEntity[]> {
    const list = await this.prisma.rolePermission.findMany({
      include: { role: true, permission: true },
    });

    return list.map((item) => new RolePermissionEntity(item));
  }

  async findByUserId(userId: string): Promise<RolePermissionEntity[]> {
    const detailedResults = await this.prisma.rolePermission.findMany({
      where: { role: { users: { some: { userId: userId } } } },
      include: { permission: true },
    });

    // // Step 1: Get the grouped permissionIds
    // const groupedPermissionIds = await this.prisma.rolePermission.groupBy({
    //   by: ['permissionId'],
    //   where: { role: { users: { some: { userId: userId } } } },
    // });

    // // Step 2: Fetch the detailed information for each permissionId
    // const detailedResults = await Promise.all(
    //   groupedPermissionIds.map(async (group) => {
    //     const permissionId = group.permissionId;
    //     const result = await this.prisma.permission.findFirst({
    //       where: {
    //         permissionId: permissionId,
    //       },
    //     });
    //     return result;
    //   }),
    // );

    return detailedResults.map((item) => new RolePermissionEntity(item));
  }

  async remove(
    roleId: string,
    permissionId: string,
  ): Promise<RolePermissionEntity> {
    return new RolePermissionEntity(
      await this.prisma.rolePermission.delete({
        where: {
          roleId_permissionId: {
            roleId: roleId,
            permissionId: permissionId,
          },
        },
      }),
    );
  }
}
