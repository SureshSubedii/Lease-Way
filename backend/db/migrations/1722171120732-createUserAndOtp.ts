import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndOtp1722171120732 implements MigrationInterface {
    name = 'CreateUserAndOtp1722171120732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "otp" ("id" SERIAL NOT NULL, "otp_secret" character varying NOT NULL, "user_id" integer, CONSTRAINT "UQ_258d028d322ea3b856bf9f12f25" UNIQUE ("user_id"), CONSTRAINT "REL_258d028d322ea3b856bf9f12f2" UNIQUE ("user_id"), CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "app_user" ("id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3fa909d0e37c531ebc237703391" UNIQUE ("email"), CONSTRAINT "PK_22a5c4a3d9b2fb8e4e73fc4ada1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "otp" ADD CONSTRAINT "FK_258d028d322ea3b856bf9f12f25" FOREIGN KEY ("user_id") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "FK_258d028d322ea3b856bf9f12f25"`);
        await queryRunner.query(`DROP TABLE "app_user"`);
        await queryRunner.query(`DROP TABLE "otp"`);
    }

}
