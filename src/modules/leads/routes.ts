import { FastifyInstance } from 'fastify';

export async function leadsRoutes(app: FastifyInstance) {
  app.post('/leads', async (request, reply) => {
    return { message: 'Lead criado (mock)' };
  });
}