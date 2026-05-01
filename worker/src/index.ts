import { WhatsAppWorker } from './whatsapp-worker';
import pino from 'pino';

const logger = pino();

async function main() {
  const worker = new WhatsAppWorker();

  try {
    // Connect to WhatsApp
    await worker.connect();

    // Keep worker running
    logger.info('Worker is running. Press Ctrl+C to stop.');
    process.on('SIGINT', async () => {
      logger.info('Shutting down worker...');
      await worker.disconnect();
      process.exit(0);
    });
  } catch (error) {
    logger.error('Worker error:', error);
    process.exit(1);
  }
}

main();
