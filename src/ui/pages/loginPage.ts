import { Page } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Login Page Object
 * Encapsulates all login page interactions
 */
export class LoginPage extends BasePage {
  // Element selectors
  private readonly emailInput = 'input[type="email"]';
  private readonly passwordInput = 'input[type="password"]';
  private readonly loginButton = 'button[type="submit"]';
  private readonly errorMessage = '[data-testid="error-message"]';
  private readonly rememberMeCheckbox = 'input[type="checkbox"]';
  private readonly forgotPasswordLink = 'a[href="/forgot-password"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin(): Promise<void> {
    await this.goto('/login');
  }

  /**
   * Enter email
   */
  async enterEmail(email: string): Promise<void> {
    await this.fillInput(this.emailInput, email);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  /**
   * Perform complete login
   */
  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await this.waitForPageLoad();
  }

  /**
   * Check if login is successful (redirect to home)
   */
  async isLoginSuccessful(): Promise<boolean> {
    return this.page.url().includes('/home') || this.page.url().includes('/dashboard');
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    return this.getElementText(this.errorMessage);
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return this.isElementVisible(this.errorMessage);
  }

  /**
   * Click remember me checkbox
   */
  async clickRememberMe(): Promise<void> {
    await this.clickElement(this.rememberMeCheckbox);
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.clickElement(this.forgotPasswordLink);
  }
}
