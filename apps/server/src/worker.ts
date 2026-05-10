import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { prisma } from '@wa-hub/database';
import {
  BrowserLauncher,
  ContextManager,
  sendMessage,
  getQRCode,
  isAuthenticated,
  getChats,
  getMessages
} from '@wa-hub/wa-engine';
import { Server } from 'socket.io';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

const launcher = new BrowserLauncher();
const contextManager = new ContextManager();

let browser: any = null;
let context: any = null;
let page: any = null;
let io: Server | null = null;
let isInitializing = false;

export function setIo(socketIo: Server) {
  io = socketIo;
}

// Accessor for the page instance
export function getWAPage() {
  return page;
}

async function saveSession() {
  if (context) {
    const state = await context.storageState();
    await prisma.session.upsert({
      where: { id: 'default-session' },
      update: { data: state, status: 'active', updatedAt: new Date() },
      create: { id: 'default-session', userId: 'system', status: 'active', data: state }
    });
  }
}

async function initWA() {
  if (isInitializing) return;
  isInitializing = true;

  try {
    if (!browser) {
      browser = await launcher.launch();

      const session = await prisma.session.findUnique({ where: { id: 'default-session' } });
      const storageState = session?.data || undefined;

      context = await contextManager.createContext(browser, storageState);
      page = await context.newPage();

      await page.goto('https://web.whatsapp.com', { waitUntil: 'networkidle' });
    }

    const monitor = async () => {
      while (true) {
        try {
          const auth = await isAuthenticated(page);
          if (auth) {
            io?.emit('wa:status', 'authenticated');
            await saveSession();

            // Periodically sync chats
            const chats = await getChats(page);
            io?.emit('wa:chats', chats);

            await new Promise(r => setTimeout(r, 30000));
          } else {
            const qr = await getQRCode(page);
            if (qr) {
              io?.emit('wa:qr', qr);
              io?.emit('wa:status', 'qr_required');
            }
            await new Promise(r => setTimeout(r, 5000));
          }
        } catch (e) {
          console.error('Monitor error:', e);
          await new Promise(r => setTimeout(r, 5000));
        }
      }
    };

    monitor();

  } catch (err) {
    console.error('Failed to init WA:', err);
  } finally {
    isInitializing = false;
  }
}

async function ensureSystemUser() {
  await prisma.user.upsert({
    where: { email: 'system@wa-hub.local' },
    update: {},
    create: { id: 'system', email: 'system@wa-hub.local', name: 'System' }
  });
}

ensureSystemUser().then(() => initWA());

const worker = new Worker('message-queue', async (job: Job) => {
  const { messageId, to, message } = job.data;
  const dbJob = await prisma.job.create({
    data: { type: 'send_message', payload: job.data, status: 'active' }
  });

  try {
    if (!page) await initWA();
    const auth = await isAuthenticated(page);
    if (!auth) throw new Error('Not authenticated to WhatsApp');

    await sendMessage(page, to, message);

    if (messageId) {
      await prisma.message.update({
        where: { id: messageId },
        data: { status: 'sent', sentAt: new Date() }
      });
    }
    await prisma.job.update({ where: { id: dbJob.id }, data: { status: 'completed' } });
  } catch (error: any) {
    console.error('Job failed:', error);
    if (messageId) {
      await prisma.message.update({ where: { id: messageId }, data: { status: 'failed', error: error.message } });
    }
    await prisma.job.update({ where: { id: dbJob.id }, data: { status: 'failed' } });
    throw error;
  }
}, { connection });

console.log('Worker started...');
