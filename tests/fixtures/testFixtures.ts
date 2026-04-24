import { test as base, Page, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../../src/ui/pages/loginPage';
import { HomePage } from '../../src/ui/pages/homePage';
import { UserApiClient } from '../../src/api/clients/userApiClient';
import { configLoader } from '../../src/utils/configLoader';
import { logger } from '../../src/utils/logger';

/**
 * Custom Fixtures - Extends Playwright test with page objects and API clients
 * Makes tests cleaner and easier to read
 */

type TestFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  userApiClient: UserApiClient;
  logMessage: (message: string) => void;
};

export const test = base.extend<TestFixtures>({
  // Login Page fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    logger.info('LoginPage fixture initialized');
    await use(loginPage);
  },

  // Home Page fixture
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    logger.info('HomePage fixture initialized');
    await use(homePage);
  },

  // User API Client fixture
  userApiClient: async ({ request }, use) => {
    const apiClient = new UserApiClient(request, configLoader.get('apiUrl'));
    logger.info('UserApiClient fixture initialized');
    await use(apiClient);
  },

  // Logging helper fixture
  logMessage: async ({}, use) => {
    await use((message: string) => {
      logger.info(message);
    });
  },
});

export { expect } from '@playwright/test';
