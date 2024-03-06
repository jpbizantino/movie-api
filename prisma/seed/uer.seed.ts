import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const initialUsers = [
  {
    username: 'admin',
    email: 'admin@admin.com',
    password: 'Juan1234',
  },
];

const roundsOfHashing = 10;

export const seedUsers = async (prisma: PrismaClient) => {
  await Promise.all(
    initialUsers.map(async (item) => {
      const hassedPass = await bcrypt.hash(item.password, roundsOfHashing);

      const adminRole = await prisma.role.findUnique({
        where: { code: 'admin' },
      });

      const output = await prisma.user.upsert({
        where: { email: item.email },
        update: {
          username: item.username,
          email: item.email,
          password: hassedPass,
          roles: {
            connect: { roleId: adminRole.roleId },
          },
        },
        create: {
          username: item.username,
          email: item.email,
          password: hassedPass,
          roles: {
            connect: { roleId: adminRole.roleId },
          },
        },
      });

      console.log(output);
    }),
  );
};
