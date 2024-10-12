import { SCRIPT_CONSTANTS } from '@common/infra/database/constants';
import { MigrationFileHelper } from '@repo/shared';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchema1676172431838 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      MigrationFileHelper.read(SCRIPT_CONSTANTS.CREATE_SCHEMA),
    );
    await queryRunner.query(
      MigrationFileHelper.read(SCRIPT_CONSTANTS.SEED_SCHEMA),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      MigrationFileHelper.read(SCRIPT_CONSTANTS.CREATE_SCHEMA_DOWN),
    );
  }
}
