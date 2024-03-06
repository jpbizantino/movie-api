import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../../permissions/decorators/permission.decorator';
import { PermissionEnum } from 'src/permissions/enums/permission.enum';
import { RolesPermissionsService } from '../roles-permissions.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { RolePermissionEntity } from '../entities/role-permission.entity';

@Injectable()
export class RolePermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private rolePermissionService: RolesPermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionEnum[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) return true;

    console.log(requiredPermissions);

    const { user } = context.switchToHttp().getRequest();

    if (!user) return true;

    const castedUser = new UserEntity(user);

    const permissions = await this.rolePermissionService.findByUserId(
      castedUser.userId,
    );

    const permissionsArray = permissions.map(
      (item) => new RolePermissionEntity(item),
    );

    console.log(permissionsArray);

    return requiredPermissions.some((permission) =>
      permissionsArray.some((p) => p.permission.code == permission),
    );
  }
}
