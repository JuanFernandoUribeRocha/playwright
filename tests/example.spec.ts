import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

  await page.pause();
});

test ('testAmazon', async ({page}) => {

  await page.goto('https://www.amazon.com.mx');
  await page.locator('input[id=\'twotabsearchtextbox\']').fill('Iphone 17');
  await page.keyboard.press('Enter');
  await expect(page.locator('//span[contains(@class, \'a-button-text a-declarative\')]')).toBeVisible();
  await page.pause();
});
