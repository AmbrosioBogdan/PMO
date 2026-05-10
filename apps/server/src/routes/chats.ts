import { FastifyInstance } from "fastify";
import { getWAPage } from "../worker.js";
import { getChats, getMessages } from "@wa-hub/wa-engine";

export async function chatRoutes(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    const page = getWAPage();
    if (!page) return [];
    return await getChats(page);
  });

  fastify.get('/:name/messages', async (request: any) => {
    const { name } = request.params;
    const page = getWAPage();
    if (!page) return [];
    return await getMessages(page, name);
  });
}
