import { chromium, Browser, Page } from 'playwright';
import pino from 'pino';

const logger = pino();

interface WhatsAppMessage {
  contact: string;
  message: string;
  timestamp: Date;
  isIncoming: boolean;
}

export class WhatsAppWorker {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private isConnected: boolean = false;

  constructor() {
    logger.info('WhatsAppWorker initialized');
  }

  async connect(): Promise<void> {
    try {
      logger.info('Connecting to WhatsApp Web...');
      
      this.browser = await chromium.launch({
        headless: false, // Set to true for production
      });

      this.page = await this.browser.newPage();
      await this.page.goto('https://web.whatsapp.com');
      
      logger.info('Waiting for user to scan QR code...');
      // Wait for user to authenticate (max 2 minutes)
      await this.page.waitForURL('https://web.whatsapp.com/');
      
      this.isConnected = true;
      logger.info('Successfully connected to WhatsApp');
    } catch (error) {
      logger.error('Failed to connect to WhatsApp:', error);
      throw error;
    }
  }

  async sendMessage(contact: string, message: string): Promise<boolean> {
    if (!this.page || !this.isConnected) {
      throw new Error('WhatsApp worker not connected');
    }

    try {
      logger.info(`Sending message to ${contact}`);
      
      // Search for contact
      const searchBox = await this.page.$('[aria-label="Search input textbox"]');
      if (!searchBox) throw new Error('Search box not found');

      await searchBox.type(contact);
      await this.page.waitForTimeout(1000);

      // Click on the first contact
      const chatItem = await this.page.$('[role="option"]');
      if (!chatItem) throw new Error('Contact not found');

      await chatItem.click();
      await this.page.waitForTimeout(500);

      // Type and send message
      const messageInput = await this.page.$('[aria-label="Message"]');
      if (!messageInput) throw new Error('Message input not found');

      await messageInput.type(message);
      
      const sendButton = await this.page.$('[aria-label="Send"]');
      if (sendButton) {
        await sendButton.click();
      }

      logger.info(`Message sent to ${contact}`);
      return true;
    } catch (error) {
      logger.error(`Failed to send message to ${contact}:`, error);
      return false;
    }
  }

  async readMessages(): Promise<WhatsAppMessage[]> {
    if (!this.page || !this.isConnected) {
      throw new Error('WhatsApp worker not connected');
    }

    try {
      logger.info('Reading messages...');
      const messages: WhatsAppMessage[] = [];

      // Get all chat items
      const chatItems = await this.page.$$('[role="option"]');
      logger.info(`Found ${chatItems.length} chats`);

      // For now, return empty array - implement full logic later
      return messages;
    } catch (error) {
      logger.error('Failed to read messages:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.isConnected = false;
      logger.info('WhatsApp worker disconnected');
    }
  }

  getStatus(): { isConnected: boolean } {
    return { isConnected: this.isConnected };
  }
}
