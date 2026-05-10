import { FastifyInstance } from 'fastify';
import { prisma } from '@wa-hub/database';

export async function jobRoutes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });
  });
}
