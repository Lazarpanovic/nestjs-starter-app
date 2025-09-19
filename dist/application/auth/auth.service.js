"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const register_user_dto_1 = require("./dtos/req/register-user.dto");
const user_dto_1 = require("../user/dtos/res/user.dto");
const user_entity_1 = require("../../database/entities/user.entity");
const user_role_entity_1 = require("../../database/entities/user-role.entity");
const role_entity_1 = require("../../database/entities/role.entity");
const bcrypt = __importStar(require("bcrypt"));
const typeorm_transactional_1 = require("typeorm-transactional");
let AuthService = class AuthService {
    constructor(userRepository, roleRepository, userRoleRepository, jwtService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const exists = await this.userRepository.findOne({ where: { email: dto.email } });
        if (exists) {
            throw new common_1.UnauthorizedException('User with this email already exists');
        }
        const { passwordHash, salt } = await this.hashPassword(dto.password);
        const user = await this.userRepository.save({
            ...dto,
            password: passwordHash,
            salt,
        });
        const userRole = await this.roleRepository.findOne({ where: { name: role_entity_1.RoleName.USER } });
        if (!userRole) {
            throw new common_1.NotFoundException('Default user role not found');
        }
        try {
            await this.userRoleRepository.save({ userId: user.id, roleId: userRole.id });
        }
        catch (error) {
            throw new Error(`Error while creating user role: ${error.message}`);
        }
        return new user_dto_1.UserRes(user);
    }
    async login(dto) {
        const user = await this.userRepository.findOne({
            where: { email: dto.email },
            relations: { userRoles: { role: true } },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isValid = await this.validatePassword(dto.password, user.password, user.salt);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            roles: user.userRoles.map((ur) => (ur.role ? ur.role.name : null)),
        };
        const token = this.jwtService.sign(payload);
        return { token, user: new user_dto_1.UserRes(user) };
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        return {
            passwordHash,
            salt,
        };
    }
    async validatePassword(payloadPassword, userPassword, salt) {
        const hash = await bcrypt.hash(payloadPassword, salt);
        return hash === userPassword;
    }
};
exports.AuthService = AuthService;
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "register", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map