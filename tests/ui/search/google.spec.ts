import { test, expect } from '../../fixtures/testFixtures';

test.describe('Google Search', () => {
  test('should open Google and enter text in the search box', async ({ googleSearchPage }) => {
    const searchText = 'Playwright automation with TypeScript';

    await googleSearchPage.navigateToGoogle();
    await googleSearchPage.enterSearchText(searchText);

    await expect(googleSearchPage.getSearchInput()).toHaveValue(searchText);
  });
});
