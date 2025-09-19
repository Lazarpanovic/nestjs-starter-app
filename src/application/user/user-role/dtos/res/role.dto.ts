import { Role } from '../../../../../database/entities/role.entity';

export class RoleRes {
  id: string;
  name: string;
  description: string | null;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.description = role.description;
  }
}
