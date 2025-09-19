import { UserRole } from './user-role.entity';
export declare enum RoleName {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare class Role {
    id: string;
    name: RoleName;
    description: string | null;
    userRoles: UserRole[];
    createdAt: Date;
    updatedAt: Date;
}
