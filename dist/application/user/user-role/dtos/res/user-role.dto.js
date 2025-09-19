"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleRes = void 0;
const role_dto_1 = require("./role.dto");
class UserRoleRes {
    constructor(userRole) {
        this.id = userRole.id;
        this.role = userRole.role ? new role_dto_1.RoleRes(userRole.role) : null;
    }
}
exports.UserRoleRes = UserRoleRes;
//# sourceMappingURL=user-role.dto.js.map