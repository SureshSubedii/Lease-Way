import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOtpColumn1721836246944 implements MigrationInterface {
  name = 'AddOtpColumn1721836246944';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_user" ADD "otp" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "otp"`);
  }
}
