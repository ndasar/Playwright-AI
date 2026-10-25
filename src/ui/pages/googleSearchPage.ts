import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class GoogleSearchPage extends BasePage {
  private readonly searchInput = '[name="q"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToGoogle(): Promise<void> {
    await this.page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });
  }

  async enterSearchText(text: string): Promise<void> {
    await this.fillInput(this.searchInput, text);
  }

  getSearchInput(): Locator {
    return this.getLocator(this.searchInput);
  }
}
