import { FastifyInstance } from 'fastify';
import { messageQueue } from '../queue/index.js';
import { prisma } from '@wa-hub/database';

export async function messageRoutes(fastify: FastifyInstance) {
  fastify.post('/send', async (request, reply) => {
    const { to, message, scheduleAt } = request.body as any;

    const dbMessage = await prisma.message.create({
      data: {
        to,
        body: message,
        status: 'queued',
        scheduledAt: scheduleAt ? new Date(scheduleAt) : null,
      }
    });

    await messageQueue.add('send-message', {
      messageId: dbMessage.id,
      to,
      message,
    }, {
      delay: scheduleAt ? new Date(scheduleAt).getTime() - Date.now() : 0
    });

    return dbMessage;
  });

  fastify.get('/status/:id', async (request, reply) => {
    const { id } = request.params as any;
    const msg = await prisma.message.findUnique({ where: { id } });
    return msg;
  });
}
