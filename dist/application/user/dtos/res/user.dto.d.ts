import { User } from '../../../../database/entities/user.entity';
import { UserRoleRes } from '../../user-role/dtos/res/user-role.dto';
export declare class UserRes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: UserRoleRes[] | [];
    birthDate: Date;
    createdAt: Date;
    updatedAt: Date;
    constructor(user: User);
}
