import { join } from 'path';

const scriptsPath = join(__dirname, '..', 'migrations', 'scripts');

export const SCRIPT_CONSTANTS = {
  CREATE_SCHEMA: `${scriptsPath}/1725017388754-create-schema.sql`,
  CREATE_SCHEMA_DOWN: `${scriptsPath}/1725017388754-create-schema-down.sql`,
};
