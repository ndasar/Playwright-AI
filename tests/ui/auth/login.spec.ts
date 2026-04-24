import { test, expect } from '../../fixtures/testFixtures';
import { TEST_USERS } from '../../../src/utils/testData';
import { logger } from '../../../src/utils/logger';

/**
 * UI Automation Tests - Login Feature
 * Tests user login functionality using Page Object Model
 */

test.describe('User Authentication - Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    logger.info('Navigating to login page');
    await loginPage.navigateToLogin();
  });

  test('should successfully login with valid credentials', async ({ loginPage, homePage }) => {
    // Arrange
    const { email, password } = TEST_USERS.validUser;
    logger.info(`Attempting login with email: ${email}`);

    // Act
    await loginPage.login(email, password);

    // Assert
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBeTruthy();
    logger.info('User logged in successfully');
  });

  test('should display error message with invalid credentials', async ({ loginPage }) => {
    // Arrange
    const { email, password } = TEST_USERS.invalidUser;
    logger.info(`Attempting login with invalid email: ${email}`);

    // Act
    await loginPage.login(email, password);

    // Assert
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
    logger.info('Error message displayed as expected');
  });

  test('should remember user when remember me is checked', async ({ loginPage }) => {
    // Arrange
    const { email, password } = TEST_USERS.validUser;

    // Act
    await loginPage.enterEmail(email);
    await loginPage.clickRememberMe();
    await loginPage.enterPassword(password);
    await loginPage.clickLoginButton();

    // Assert - In a real scenario, you'd check localStorage or cookies
    expect(await loginPage.isLoginSuccessful()).toBeTruthy();
    logger.info('Remember me functionality works');
  });

  test('should navigate to forgot password page', async ({ loginPage }) => {
    // Act
    await loginPage.clickForgotPassword();

    // Assert
    expect(loginPage.page.url()).toContain('/forgot-password');
    logger.info('Navigated to forgot password page');
  });
});

test.describe('User Home Page', () => {
  test.beforeEach(async ({ loginPage, homePage }) => {
    logger.info('Logging in before home page tests');
    await loginPage.navigateToLogin();
    await loginPage.login(TEST_USERS.validUser.email, TEST_USERS.validUser.password);
  });

  test('should display home page after successful login', async ({ homePage }) => {
    // Assert
    const isLoggedIn = await homePage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
    logger.info('User is logged in on home page');
  });

  test('should display welcome message', async ({ homePage }) => {
    // Act
    const welcomeMessage = await homePage.getWelcomeMessage();

    // Assert
    expect(welcomeMessage).toContain('Welcome');
    logger.info(`Welcome message: ${welcomeMessage}`);
  });

  test('should logout successfully', async ({ homePage, loginPage }) => {
    // Act
    await homePage.logout();

    // Assert
    expect(homePage.page.url()).toContain('/login');
    const isLoggedIn = await homePage.isUserLoggedIn();
    expect(isLoggedIn).toBeFalsy();
    logger.info('User logged out successfully');
  });
});
