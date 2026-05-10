import { chromium, Browser, BrowserContext } from 'playwright';

export class BrowserLauncher {
  private browser: Browser | null = null;

  async launch(): Promise<Browser> {
    this.browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    return this.browser;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
