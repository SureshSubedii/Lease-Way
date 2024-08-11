import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGoogleColToUsers1723361993004 implements MigrationInterface {
  name = 'AddGoogleColToUsers1723361993004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_user" ADD "google" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_user" ALTER COLUMN "address" DROP NOT NULL`,
    );
  }
}
