import Fastify from 'fastify';
import { leadsRoutes } from './modules/leads/routes';
import { ZodError } from 'zod';
import { ConflictError } from '@/shared/errors/conflict-error';

export const app = Fastify({
  logger: true
});

app.register(leadsRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send( {
      error: 'Validation error',
      issues: error.issues
    });
  }

  if (error instanceof ConflictError) {
     return reply.status(422).send({
      error: error.message
    });
  }

  request.log.error(error);

  return reply.status(500).send({
    error: 'Internal server error'
  });
});