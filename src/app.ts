import Fastify from 'fastify';
import { leadsRoutes } from './modules/leads/routes';

export const app = Fastify({
  logger: true
});

app.register(leadsRoutes)