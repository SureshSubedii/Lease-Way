import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1721810224596 implements MigrationInterface {
    name = 'CreateUser1721810224596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_user" ("id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "is_active" boolean NOT NULL, CONSTRAINT "PK_22a5c4a3d9b2fb8e4e73fc4ada1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "app_user"`);
    }

}
