import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCreatedAtInUserOtp1722172359485 implements MigrationInterface {
    name = 'AddedCreatedAtInUserOtp1722172359485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "otp" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "app_user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "created_at"`);
    }

}
