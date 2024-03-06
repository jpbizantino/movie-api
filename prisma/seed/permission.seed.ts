import { PrismaClient } from '@prisma/client';

const initialPermissions = [
  {
    code: 'read',
    name: 'LEER',
    active: true,
  },
  {
    code: 'edit',
    name: 'EDITAR',
    active: true,
  },
  {
    code: 'edit_review',
    name: 'EDITAR RESEÑA',
    active: true,
  },
  {
    code: 'create',
    name: 'CREAR',
    active: true,
  },
  {
    code: 'create_review',
    name: 'CREAR RESEÑA',
    active: true,
  },
  {
    code: 'delete',
    name: 'ELIMINAR',
    active: true,
  },
];

export const seedPermissions = async (prisma: PrismaClient) => {
  await Promise.all(
    initialPermissions.map(async (item) => {
      const output = await prisma.permission.upsert({
        where: { code: item.code },
        update: {},
        create: item,
      });

      console.log(output);
    }),
  );
};
