"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_dto_1 = require("./dtos/res/user.dto");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../database/entities/user.entity");
const user_role_entity_1 = require("../../database/entities/user-role.entity");
const typeorm_transactional_1 = require("typeorm-transactional");
let UserService = class UserService {
    constructor(userRepository, userRoleRepository) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
    }
    async getUserById(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: {
                userRoles: {
                    role: true,
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getAllUsers() {
        const users = await this.userRepository.find({
            relations: {
                userRoles: {
                    role: true,
                },
            },
        });
        return users.map((user) => new user_dto_1.UserRes(user));
    }
    async updateUser(id, userData) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: { userRoles: { role: true } },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const updatedUser = await this.userRepository.update(id, userData);
        if (updatedUser.affected === 1) {
            Object.assign(user, userData);
        }
        return new user_dto_1.UserRes(user);
    }
    async deleteUser(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        try {
            await this.userRoleRepository.delete({ userId: id });
            await this.userRepository.delete(id);
        }
        catch (error) {
            throw new Error(`Error while deleting user or user roles: ${error.message}`);
        }
    }
};
exports.UserService = UserService;
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "deleteUser", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map