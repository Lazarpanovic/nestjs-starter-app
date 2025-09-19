import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateUserTable1757964432524 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
