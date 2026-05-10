import { Page } from 'playwright';

export class SessionValidator {
  async isValid(page: Page): Promise<boolean> {
    try {
      await page.goto('https://web.whatsapp.com', { waitUntil: 'networkidle' });
      const isLogged = await page.evaluate(() => {
        return !!document.querySelector('#pane-side');
      });
      return isLogged;
    } catch (e) {
      return false;
    }
  }
}
