import { PrismaClient } from '@prisma/client';

const initialRolesPermissions = [
  // Basic Role
  {
    roleCode: 'basic',
    permissionCode: 'read',
  },
  {
    roleCode: 'basic',
    permissionCode: 'create_review',
  },

  // Editor Role
  {
    roleCode: 'editor',
    permissionCode: 'read',
  },
  {
    roleCode: 'editor',
    permissionCode: 'edit',
  },
  {
    roleCode: 'editor',
    permissionCode: 'create',
  },
  {
    roleCode: 'editor',
    permissionCode: 'create_review',
  },
  {
    roleCode: 'editor',
    permissionCode: 'delete',
  },
  // Admin Role
  {
    roleCode: 'admin',
    permissionCode: 'read',
  },
  {
    roleCode: 'admin',
    permissionCode: 'edit',
  },
  {
    roleCode: 'admin',
    permissionCode: 'create',
  },
  {
    roleCode: 'admin',
    permissionCode: 'delete',
  },
];

export const seedRolesPermissions = async (prisma: PrismaClient) => {
  await Promise.all(
    initialRolesPermissions.map(async (item) => {
      const role = await prisma.role.findUnique({
        where: { code: item.roleCode },
      });

      const permission = await prisma.permission.findUnique({
        where: { code: item.permissionCode },
      });

      const exist = await prisma.rolePermission.findFirst({
        where: {
          role: { roleId: role.roleId },
          permission: { permissionId: permission.permissionId },
        },
      });

      if (!exist) {
        const output = await prisma.rolePermission.create({
          data: {
            role: { connect: { roleId: role.roleId } },
            permission: { connect: { permissionId: permission.permissionId } },
          },
        });
        console.log(output);
      }
    }),
  );
};
