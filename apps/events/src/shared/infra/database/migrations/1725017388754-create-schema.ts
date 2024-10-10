import { MigrationInterface, QueryRunner } from 'typeorm';
import { MigrationFileHelper } from '../../helpers/migration-file-helper';
import { SCRIPT_CONSTANTS } from '../constants';

export class CreateSchema1676172431838 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      MigrationFileHelper.read(SCRIPT_CONSTANTS.CREATE_SCHEMA),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      MigrationFileHelper.read(SCRIPT_CONSTANTS.CREATE_SCHEMA_DOWN),
    );
  }
}
