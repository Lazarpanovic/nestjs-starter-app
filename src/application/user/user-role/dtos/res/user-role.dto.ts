import { UserRole } from '../../../../../database/entities/user-role.entity';
import { RoleRes } from './role.dto';

export class UserRoleRes {
  id: string;
  role: RoleRes | null;

  constructor(userRole: UserRole) {
    this.id = userRole.id;
    this.role = userRole.role ? new RoleRes(userRole.role) : null;
  }
}
