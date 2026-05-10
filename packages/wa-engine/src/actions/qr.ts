import { Page } from 'playwright';

export async function getQRCode(page: Page): Promise<string | null> {
  try {
    const qrSelector = 'canvas[aria-label="Scan me!"]';
    await page.waitForSelector(qrSelector, { timeout: 10000 });
    const qrCanvas = await page.$(qrSelector);
    if (qrCanvas) {
      const screenshot = await qrCanvas.screenshot({ type: 'png' });
      return screenshot.toString('base64');
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function isAuthenticated(page: Page): Promise<boolean> {
  try {
    // Look for a selector that only appears when logged in, like the search bar or the side menu
    const sideSelector = '#side';
    await page.waitForSelector(sideSelector, { timeout: 5000 });
    return true;
  } catch (e) {
    return false;
  }
}
