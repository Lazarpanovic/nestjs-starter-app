import { UserRoleService } from './user-role.service';
import { UpdateUserRoleDto } from './dtos/req/update-user-role.dto';
export declare class UserRoleController {
    private readonly userRoleService;
    constructor(userRoleService: UserRoleService);
    updateUserRole(userId: string, userRoleData: UpdateUserRoleDto): Promise<import("./dtos/res/user-role.dto").UserRoleRes>;
}
