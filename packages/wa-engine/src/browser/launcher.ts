import { chromium, Browser } from 'playwright';

export class BrowserLauncher {
  private browser: Browser | null = null;

  async launch(): Promise<Browser> {
    if (this.browser) return this.browser;

    this.browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // helpful in some containerized environments
        '--disable-gpu'
      ]
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
