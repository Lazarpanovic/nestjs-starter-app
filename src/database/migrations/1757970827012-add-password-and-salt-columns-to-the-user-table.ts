import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordAndSaltColumnsToTheUserTable1757970827012 implements MigrationInterface {
  name = 'AddPasswordAndSaltColumnsToTheUserTable1757970827012';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "salt" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
