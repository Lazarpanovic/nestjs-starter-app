import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/req/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<import("./dtos/res/user.dto").UserRes[]>;
    getUserById(id: string): Promise<import("../../database/entities/user.entity").User | null>;
    updateUser(userData: UpdateUserDto, id: string): Promise<import("./dtos/res/user.dto").UserRes>;
    deleteUser(id: string): Promise<void>;
}
