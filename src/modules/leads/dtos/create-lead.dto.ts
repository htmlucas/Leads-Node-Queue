import { z } from 'zod';
import { createLeadSchema } from '../schemas/create-lead.schema';

export type CreateLeadDTO = z.infer<typeof createLeadSchema>;