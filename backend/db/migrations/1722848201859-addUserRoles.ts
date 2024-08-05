import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRoles1722848201859 implements MigrationInterface {
  name = 'AddUserRoles1722848201859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."app_user_role_enum" AS ENUM('admin', 'tenant', 'owner')`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_user" ADD "role" "public"."app_user_role_enum" NOT NULL DEFAULT 'tenant'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."app_user_role_enum"`);
  }
}
