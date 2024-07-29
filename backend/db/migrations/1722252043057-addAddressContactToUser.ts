import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAddressContactToUser1722252043057
  implements MigrationInterface
{
  name = 'AddAddressContactToUser1722252043057';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "app_user" ADD "contact" character varying `,
    );
    await queryRunner.query(
      `ALTER TABLE "app_user" ADD "address" character varying `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "address"`);
    await queryRunner.query(`ALTER TABLE "app_user" DROP COLUMN "contact"`);
  }
}
