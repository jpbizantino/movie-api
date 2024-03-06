import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { RoleEnum } from 'src/roles/enums/role.enum';
import { UpdateUserRolesDto } from './dto/update-user-role.dto';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    const role = await this.prisma.role.findUnique({
      where: { code: RoleEnum.BASIC },
    });

    return new UserEntity(
      await this.prisma.user.create({
        data: {
          username: createUserDto.username,
          email: createUserDto.email,
          password: hashedPassword,
          active: true,
          roles: { connect: [{ roleId: role.roleId }] },
        },
      }),
    );
  }

  async findAll(): Promise<UserEntity[]> {
    const list = await this.prisma.user.findMany({});

    return list.map((item) => new UserEntity(item));
  }

  async findOne(userId: string): Promise<UserEntity> {
    // const result = await this.prisma
    //   .$queryRaw`SELECT * FROM user a WHERE a.userId = ${userId}`;

    // return new UserEntity(result);

    return new UserEntity(
      await this.prisma.user.findUnique({
        where: { userId: userId },
        include: { roles: true },
      }),
    );
  }

  async getProfile(userId: string): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.findUnique({
        where: { userId: userId },
        include: { roles: true },
      }),
    );
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.findUnique({ where: { email: email } }),
    );
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.update({
        where: { userId: userId },
        data: {
          username: updateUserDto.username,
          email: updateUserDto.email,
        },
      }),
    );
  }

  async updateRoles(
    userId: string,
    updateUserRoleDto: UpdateUserRolesDto,
  ): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.update({
        where: { userId: userId },
        data: {
          roles: {
            connect: updateUserRoleDto.roles.map((item) => ({
              roleId: item.roleId,
            })),
          },
        },
      }),
    );
  }

  async remove(userid: string): Promise<UserEntity> {
    return new UserEntity(
      await this.prisma.user.delete({ where: { userId: userid } }),
    );
  }
}
