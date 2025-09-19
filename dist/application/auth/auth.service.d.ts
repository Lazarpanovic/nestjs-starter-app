import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dtos/req/register-user.dto';
import { LoginDto } from './dtos/req/login.dto';
import { UserRes } from '../user/dtos/res/user.dto';
import { User } from '../../database/entities/user.entity';
import { UserRole } from '../../database/entities/user-role.entity';
import { Role } from '../../database/entities/role.entity';
export declare class AuthService {
    private userRepository;
    private roleRepository;
    private userRoleRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>, userRoleRepository: Repository<UserRole>, jwtService: JwtService);
    register(dto: RegisterUserDto): Promise<UserRes>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: UserRes;
    }>;
    hashPassword(password: string): Promise<{
        passwordHash: string;
        salt: string;
    }>;
    validatePassword(payloadPassword: string, userPassword: string, salt: string): Promise<boolean>;
}
