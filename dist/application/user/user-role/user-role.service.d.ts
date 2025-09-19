import { Repository } from 'typeorm';
import { User } from '../../../database/entities/user.entity';
import { Role } from '../../../database/entities/role.entity';
import { UserRole } from '../../../database/entities/user-role.entity';
import { UpdateUserRoleDto } from './dtos/req/update-user-role.dto';
import { UserRoleRes } from './dtos/res/user-role.dto';
export declare class UserRoleService {
    private userRepository;
    private roleRepository;
    private userRoleRepository;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>, userRoleRepository: Repository<UserRole>);
    updateUserRole(userId: string, userRoleData: UpdateUserRoleDto): Promise<UserRoleRes>;
}
