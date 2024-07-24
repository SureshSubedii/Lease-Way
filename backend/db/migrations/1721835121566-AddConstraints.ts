import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddConstraints1721835121566 implements MigrationInterface {
  name = 'AddConstraints1721835121566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_user" ADD CONSTRAINT "UQ_3fa909d0e37c531ebc237703391" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_user" ALTER COLUMN "is_active" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_user" ALTER COLUMN "is_active" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "app_user" DROP CONSTRAINT "UQ_3fa909d0e37c531ebc237703391"`,
    );
  }
}
