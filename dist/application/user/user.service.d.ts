import { Repository } from 'typeorm';
import { UserRes } from './dtos/res/user.dto';
import { UpdateUserDto } from './dtos/req/update-user.dto';
import { User } from '../../database/entities/user.entity';
import { UserRole } from '../../database/entities/user-role.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly userRoleRepository;
    constructor(userRepository: Repository<User>, userRoleRepository: Repository<UserRole>);
    getUserById(id: string): Promise<User | null>;
    getAllUsers(): Promise<UserRes[]>;
    updateUser(id: string, userData: UpdateUserDto): Promise<UserRes>;
    deleteUser(id: string): Promise<void>;
}
