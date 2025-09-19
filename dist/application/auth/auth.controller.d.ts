import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/req/register-user.dto';
import { LoginDto } from './dtos/req/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        token: string;
        user: import("../user/dtos/res/user.dto").UserRes;
    }>;
    register(dto: RegisterUserDto): Promise<import("../user/dtos/res/user.dto").UserRes>;
}
