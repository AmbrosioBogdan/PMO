import { test, expect } from '@playwright/test';

test('dashboard loads', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('h1')).toContainText('WA Automation Hub');
  await page.screenshot({ path: 'screenshot.png' });
});
