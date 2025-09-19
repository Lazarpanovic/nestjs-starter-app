import { UserRole } from '../../../../../database/entities/user-role.entity';
import { RoleRes } from './role.dto';
export declare class UserRoleRes {
    id: string;
    role: RoleRes | null;
    constructor(userRole: UserRole);
}
