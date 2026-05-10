import Fastify from 'fastify';
import cors from '@fastify/cors';
import { messageRoutes } from './routes/messages.js';
import { jobRoutes } from './routes/jobs.js';
import { Server } from 'socket.io';

const fastify = Fastify({ logger: true });

await fastify.register(cors);

// Register routes
fastify.register(messageRoutes, { prefix: '/messages' });
fastify.register(jobRoutes, { prefix: '/jobs' });

fastify.get('/health', async () => ({ status: 'ok' }));

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });

    const io = new Server(fastify.server, {
      cors: {
        origin: '*',
      }
    });

    fastify.decorate('io', io);

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
    });

    console.log(`Server listening on ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
