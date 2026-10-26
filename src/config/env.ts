import dotenv from 'dotenv';
import path from 'path';
import {
  ENVIRONMENT_NAMES,
  EnvironmentName,
  environmentDefaults,
} from './environments';

function resolveEnvironmentName(): EnvironmentName {
  const value = (process.env.TEST_ENV ?? 'test').toLowerCase();

  if (!ENVIRONMENT_NAMES.includes(value as EnvironmentName)) {
    throw new Error(
      `Unknown TEST_ENV "${value}". Expected one of: ${ENVIRONMENT_NAMES.join(', ')}`,
    );
  }

  return value as EnvironmentName;
}

function loadDotenv(name: EnvironmentName): void {
  dotenv.config({ path: path.resolve(process.cwd(), `.env.${name}`) });
  dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });
}

const NAME = resolveEnvironmentName();
loadDotenv(NAME);

const defaults = environmentDefaults[NAME];

function read(name: keyof typeof defaults): string {
  return process.env[name] || defaults[name];
}

export const ENV = {
  NAME,
  UI_BASE_URL: read('UI_BASE_URL'),
  API_BASE_URL: read('API_BASE_URL'),
  API_USERNAME: read('API_USERNAME'),
  API_PASSWORD: read('API_PASSWORD'),
  UI_USERNAME: read('UI_USERNAME'),
  UI_PASSWORD: read('UI_PASSWORD'),
} as const;
