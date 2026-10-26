export const ENVIRONMENT_NAMES = ['test', 'staging'] as const;

export type EnvironmentName = (typeof ENVIRONMENT_NAMES)[number];

export type EnvironmentConfig = {
  UI_BASE_URL: string;
  API_BASE_URL: string;
  API_USERNAME: string;
  API_PASSWORD: string;
  UI_USERNAME: string;
  UI_PASSWORD: string;

};

export const environmentDefaults: Record<EnvironmentName, EnvironmentConfig> = {
  test: {
    UI_BASE_URL: 'https://www.cheapflights.com.au/',
    API_BASE_URL: 'https://restful-booker.herokuapp.com',
    API_USERNAME: 'admin',
    API_PASSWORD: 'password123',
    UI_USERNAME: 'standard_user',
    UI_PASSWORD: 'secret_sauce',
  },
  staging: {
    UI_BASE_URL: 'https://www.cheapflights.com.au/',
    API_BASE_URL: 'https://restful-booker.herokuapp.com',
    API_USERNAME: 'admin',
    API_PASSWORD: 'password123',
    UI_USERNAME: 'standard_user',
    UI_PASSWORD: 'secret_sauce',
  },
};
