import { User } from '../../../../database/entities/user.entity';
import { UserRoleRes } from '../../user-role/dtos/res/user-role.dto';

export class UserRes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: UserRoleRes[] | [];
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.roles = user.userRoles ? user.userRoles.map((userRole) => new UserRoleRes(userRole)) : [];
    this.birthDate = user.birthDate;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
