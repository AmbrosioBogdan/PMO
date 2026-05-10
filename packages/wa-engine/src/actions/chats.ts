import { Page } from 'playwright';

export interface Chat {
  id: string;
  name: string;
  lastMessage?: string;
  unreadCount?: number;
  timestamp?: string;
}

export async function getChats(page: Page): Promise<Chat[]> {
  try {
    // Selector for the chat list items in WhatsApp Web
    const chatSelector = 'div[aria-label="Chat list"] > div > div';
    await page.waitForSelector(chatSelector, { timeout: 5000 });

    const chats = await page.evaluate((selector) => {
      const items = Array.from(document.querySelectorAll(selector));
      return items.map((item, index) => {
        // This is highly dependent on WA Web's internal structure which changes often
        // We look for name and last message using common aria-labels or roles
        const nameElement = item.querySelector('span[title]');
        const name = nameElement ? nameElement.getAttribute('title') || 'Unknown' : 'Unknown';

        // Try to get unread count
        const unreadElement = item.querySelector('span[aria-label*="unread"]');
        const unreadCount = unreadElement ? parseInt(unreadElement.textContent || '0') : 0;

        return {
          id: `chat-${index}`, // Using index as ID for now
          name,
          unreadCount,
          lastMessage: '', // Placeholders
          timestamp: ''
        };
      }).filter(c => c.name !== 'Unknown');
    }, chatSelector);

    return chats;
  } catch (e) {
    console.error('Failed to get chats:', e);
    return [];
  }
}

export async function getMessages(page: Page, chatName: string): Promise<any[]> {
  try {
    // First click on the chat
    const chatBtn = await page.$(`span[title="${chatName}"]`);
    if (chatBtn) {
      await chatBtn.click();
      await page.waitForTimeout(1000); // Wait for messages to load

      const messages = await page.evaluate(() => {
        const msgItems = Array.from(document.querySelectorAll('div.message-in, div.message-out'));
        return msgItems.map((msg, index) => {
          const textElement = msg.querySelector('span.selectable-text');
          const isOut = msg.classList.contains('message-out');
          return {
            id: `msg-${index}`,
            text: textElement ? textElement.textContent : '',
            fromMe: isOut,
            timestamp: new Date().toISOString() // WA doesn't easily expose exact timestamp in DOM
          };
        });
      });
      return messages;
    }
    return [];
  } catch (e) {
    console.error('Failed to get messages:', e);
    return [];
  }
}
