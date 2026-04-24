/**
 * Config Loader - Manages configuration from environment variables
 * Supports multiple environments (dev, staging, prod)
 */

export interface Config {
  baseUrl: string;
  apiUrl: string;
  apiTimeout: number;
  environment: 'dev' | 'staging' | 'prod';
  headless: boolean;
  slowMotion: number;
  screenshot: 'on' | 'off' | 'only-on-failure';
  video: 'off' | 'retain-on-failure' | 'on';
  trace: 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';
}

class ConfigLoader {
  private config: Config;

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): Config {
    const env = process.env.ENV || 'dev';
    const baseUrls: { [key: string]: string } = {
      dev: 'http://localhost:3000',
      staging: 'https://staging.example.com',
      prod: 'https://example.com',
    };

    const apiUrls: { [key: string]: string } = {
      dev: 'http://localhost:3001/api',
      staging: 'https://api-staging.example.com',
      prod: 'https://api.example.com',
    };

    return {
      baseUrl: process.env.BASE_URL || baseUrls[env] || baseUrls.dev,
      apiUrl: process.env.API_URL || apiUrls[env] || apiUrls.dev,
      apiTimeout: parseInt(process.env.API_TIMEOUT || '30000'),
      environment: (env as 'dev' | 'staging' | 'prod') || 'dev',
      headless: process.env.HEADLESS !== 'false',
      slowMotion: parseInt(process.env.SLOW_MOTION || '0'),
      screenshot: (process.env.SCREENSHOT as 'on' | 'off' | 'only-on-failure') || 'only-on-failure',
      video: (process.env.VIDEO as 'off' | 'retain-on-failure' | 'on') || 'retain-on-failure',
      trace: (process.env.TRACE as 'off' | 'on' | 'retain-on-failure' | 'on-first-retry') || 'on-first-retry',
    };
  }

  getConfig(): Config {
    return this.config;
  }

  get(key: keyof Config): any {
    return this.config[key];
  }
}

export const configLoader = new ConfigLoader();
