import { Role } from '../../../../../database/entities/role.entity';
export declare class RoleRes {
    id: string;
    name: string;
    description: string | null;
    constructor(role: Role);
}
