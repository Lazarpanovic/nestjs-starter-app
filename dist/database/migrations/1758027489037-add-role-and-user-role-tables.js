"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRoleAndUserRoleTables1758027489037 = void 0;
const role_entity_1 = require("../entities/role.entity");
class AddRoleAndUserRoleTables1758027489037 {
    constructor() {
        this.name = 'AddRoleAndUserRoleTables1758027489037';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "role_id" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`
      INSERT INTO "role" ("name", "description")
      VALUES
        ('${role_entity_1.RoleName.ADMIN}', 'Administrator with full access'),
        ('${role_entity_1.RoleName.USER}', 'Standard user with limited access')
    `);
        const userRole = await queryRunner.manager.query(`
      SELECT id FROM "role" WHERE name = '${role_entity_1.RoleName.USER}' LIMIT 1
    `);
        const userRoleId = userRole[0]?.id;
        if (userRoleId) {
            await queryRunner.query(`
        INSERT INTO "user_role" ("user_id", "role_id")
        SELECT id, $1 FROM "user"
      `, [userRoleId]);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`);
        await queryRunner.query(`DROP TABLE "user_role"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }
}
exports.AddRoleAndUserRoleTables1758027489037 = AddRoleAndUserRoleTables1758027489037;
//# sourceMappingURL=1758027489037-add-role-and-user-role-tables.js.map