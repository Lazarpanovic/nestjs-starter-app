"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPasswordAndSaltColumnsToTheUserTable1757970827012 = void 0;
class AddPasswordAndSaltColumnsToTheUserTable1757970827012 {
    constructor() {
        this.name = 'AddPasswordAndSaltColumnsToTheUserTable1757970827012';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "salt" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }
}
exports.AddPasswordAndSaltColumnsToTheUserTable1757970827012 = AddPasswordAndSaltColumnsToTheUserTable1757970827012;
//# sourceMappingURL=1757970827012-add-password-and-salt-columns-to-the-user-table.js.map