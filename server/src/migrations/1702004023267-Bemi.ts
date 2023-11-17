
import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  bemiUpSQL,
  bemiDownSQL,
} from "@bemi/typeorm";

export class Bemi1702004023267 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(bemiUpSQL());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(bemiDownSQL());
  }

}
  