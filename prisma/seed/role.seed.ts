import { PrismaClient } from '@prisma/client';

const initialRoles = [
  {
    code: 'basic',
    name: 'BÁSICO',
    active: true,
  },
  {
    code: 'editor',
    name: 'EDITOR',
    active: true,
  },
  {
    code: 'admin',
    name: 'ADMINISTRADOR',
    active: true,
  },
];

export const seedRoles = async (prisma: PrismaClient) => {
  await Promise.all(
    initialRoles.map(async (item) => {
      const output = await prisma.role.upsert({
        where: { code: item.code },
        update: {},
        create: item,
      });

      console.log(output);
    }),
  );
};
