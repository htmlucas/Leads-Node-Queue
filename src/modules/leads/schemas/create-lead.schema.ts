import { z } from 'zod';

export const createLeadSchema = z.object({
  name: z.string().min(3, 'Nome muito curto').optional(),
  email: z.email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido').optional(),
  consent: z.boolean().optional()
});