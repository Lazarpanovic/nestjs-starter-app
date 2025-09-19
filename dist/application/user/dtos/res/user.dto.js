"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRes = void 0;
const user_role_dto_1 = require("../../user-role/dtos/res/user-role.dto");
class UserRes {
    constructor(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.roles = user.userRoles ? user.userRoles.map((userRole) => new user_role_dto_1.UserRoleRes(userRole)) : [];
        this.birthDate = user.birthDate;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}
exports.UserRes = UserRes;
//# sourceMappingURL=user.dto.js.map