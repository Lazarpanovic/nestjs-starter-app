import { User } from './user.entity';
import { Role } from './role.entity';
export declare class UserRole {
    id: string;
    user?: User;
    userId: string;
    role?: Role;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
}
