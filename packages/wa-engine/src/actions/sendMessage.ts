import { Page } from 'playwright';

export async function sendMessage(page: Page, to: String, message: string) {
  const url = `https://web.whatsapp.com/send?phone=${to}&text=${encodeURIComponent(message)}`;
  await page.goto(url, { waitUntil: 'networkidle' });

  const sendButton = 'span[data-icon="send"]';
  await page.waitForSelector(sendButton, { timeout: 30000 });
  await page.click(sendButton);

  // Wait for message to be sent
  await page.waitForTimeout(2000);
}
