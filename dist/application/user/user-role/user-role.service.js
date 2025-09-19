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
exports.UserRoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../../database/entities/user.entity");
const role_entity_1 = require("../../../database/entities/role.entity");
const user_role_entity_1 = require("../../../database/entities/user-role.entity");
const update_user_role_dto_1 = require("./dtos/req/update-user-role.dto");
const user_role_dto_1 = require("./dtos/res/user-role.dto");
const typeorm_transactional_1 = require("typeorm-transactional");
let UserRoleService = class UserRoleService {
    constructor(userRepository, roleRepository, userRoleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }
    async updateUserRole(userId, userRoleData) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const role = await this.roleRepository.findOne({ where: { id: userRoleData.roleId } });
        if (!role)
            throw new common_1.NotFoundException('Role not found');
        try {
            await this.userRoleRepository.delete({ user: { id: user.id } });
        }
        catch (error) {
            throw new Error(`Error while deleting existing user roles: ${error.message}`);
        }
        const userRole = await this.userRoleRepository.save({
            user,
            role,
        });
        return new user_role_dto_1.UserRoleRes(userRole);
    }
};
exports.UserRoleService = UserRoleService;
__decorate([
    (0, typeorm_transactional_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_role_dto_1.UpdateUserRoleDto]),
    __metadata("design:returntype", Promise)
], UserRoleService.prototype, "updateUserRole", null);
exports.UserRoleService = UserRoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserRoleService);
//# sourceMappingURL=user-role.service.js.map