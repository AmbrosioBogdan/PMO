import { FastifyInstance } from 'fastify';
import { prisma } from '@wa-hub/database';

export async function jobRoutes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return await prisma.job.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  });

  fastify.get('/:id', async (request) => {
    const { id } = request.params as any;
    return await prisma.job.findUnique({
      where: { id },
      include: { logs: true }
    });
  });
}
