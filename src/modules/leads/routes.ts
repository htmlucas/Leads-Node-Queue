import { FastifyInstance } from 'fastify';
import { LeadsController } from './controllers/leads.controller'

export async function leadsRoutes(app: FastifyInstance) {
  const controller = new LeadsController();

  app.get('/leads', controller.index);

  app.post('/leads', controller.create);
}