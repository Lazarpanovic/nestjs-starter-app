import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddRoleAndUserRoleTables1758027489037 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
