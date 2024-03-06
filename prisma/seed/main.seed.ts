import { PrismaClient } from '@prisma/client';
import { seedRoles } from './role.seed';
import { seedPermissions } from './permission.seed';
import { seedRolesPermissions } from './rolesPermissions.seed';
import { seedUsers } from './uer.seed';

const prisma = new PrismaClient();

async function main() {
  await seedRoles(prisma);
  await seedPermissions(prisma);
  await seedRolesPermissions(prisma);
  await seedUsers(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
