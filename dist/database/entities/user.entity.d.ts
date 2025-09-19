import { UserRole } from './user-role.entity';
export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    password: string;
    salt: string;
    userRoles: UserRole[];
    createdAt: Date;
    updatedAt: Date;
}
