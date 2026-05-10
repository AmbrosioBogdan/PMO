import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { prisma } from '@wa-hub/database';
import { BrowserLauncher, ContextManager, sendMessage } from '@wa-hub/wa-engine';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

const launcher = new BrowserLauncher();
const contextManager = new ContextManager();

let browser: any = null;
let context: any = null;
let page: any = null;

async function initWA() {
  if (!browser) {
    browser = await launcher.launch();
    context = await contextManager.createContext(browser);
    page = await context.newPage();
    await page.goto('https://web.whatsapp.com');
    // In a real scenario, we'd handle session recovery/QR scanning here
  }
}

const worker = new Worker('message-queue', async (job: Job) => {
  const { messageId, to, message } = job.data;

  const dbJob = await prisma.job.create({
    data: {
      type: 'send_message',
      payload: job.data,
      status: 'active',
    }
  });

  try {
    await initWA();

    // Check if we need to scan QR or if we are logged in
    // This is simplified for the boilerplate

    await sendMessage(page, to, message);

    await prisma.message.update({
      where: { id: messageId },
      data: { status: 'sent', sentAt: new Date() }
    });

    await prisma.job.update({
      where: { id: dbJob.id },
      data: { status: 'completed' }
    });

    await prisma.jobLog.create({
      data: {
        jobId: dbJob.id,
        message: 'Message sent successfully',
        level: 'info'
      }
    });

  } catch (error: any) {
    console.error('Job failed:', error);

    await prisma.message.update({
      where: { id: messageId },
      data: { status: 'failed', error: error.message }
    });

    await prisma.job.update({
      where: { id: dbJob.id },
      data: { status: 'failed' }
    });

    await prisma.jobLog.create({
      data: {
        jobId: dbJob.id,
        message: `Error: ${error.message}`,
        level: 'error'
      }
    });

    throw error;
  }
}, { connection });

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed: ${err.message}`);
});

console.log('Worker started...');
