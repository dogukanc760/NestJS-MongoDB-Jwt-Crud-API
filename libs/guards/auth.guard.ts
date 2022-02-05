import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GroupModel } from 'tools/models/group.model';
import { RoleModel } from 'tools/models/role.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!allowedRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user.user;
    const allowed = this.isAllowed(allowedRoles, user.role, user.groups);
    if (!allowed) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return true;
  }

  isAllowed(allowedRoles, userRoles: RoleModel[], userGroups: GroupModel[]) {
    const allUsersRoles = [];
    userRoles.map(data => {
      allUsersRoles.push(data.name);
    });

    userGroups.map(data=>{
        allUsersRoles.push(data.roles["name"]);
    });
    const hasRole = allUsersRoles.some(role=> allowedRoles.includes(role));
    return hasRole;

  }
}
