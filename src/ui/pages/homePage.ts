import { Page } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Home Page Object
 * Encapsulates all home page interactions
 */
export class HomePage extends BasePage {
  // Element selectors
  private readonly userMenuButton = '[data-testid="user-menu"]';
  private readonly logoutButton = '[data-testid="logout-button"]';
  private readonly welcomeMessage = '[data-testid="welcome-message"]';
  private readonly dashboardTitle = 'h1';
  private readonly navMenu = 'nav';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to home page
   */
  async navigateToHome(): Promise<void> {
    await this.goto('/home');
  }

  /**
   * Get welcome message
   */
  async getWelcomeMessage(): Promise<string> {
    return this.getElementText(this.welcomeMessage);
  }

  /**
   * Check if user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    return this.isElementVisible(this.userMenuButton);
  }

  /**
   * Click user menu
   */
  async clickUserMenu(): Promise<void> {
    await this.clickElement(this.userMenuButton);
  }

  /**
   * Click logout button
   */
  async logout(): Promise<void> {
    await this.clickUserMenu();
    await this.clickElement(this.logoutButton);
    await this.waitForPageLoad();
  }

  /**
   * Get dashboard title
   */
  async getDashboardTitle(): Promise<string> {
    return this.getElementText(this.dashboardTitle);
  }

  /**
   * Check if navigation menu is visible
   */
  async isNavMenuVisible(): Promise<boolean> {
    return this.isElementVisible(this.navMenu);
  }
}
