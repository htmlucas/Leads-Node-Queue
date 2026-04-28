import { z } from 'zod';
import { isPhone } from 'brazilian-values';

export const createLeadSchema = z.object({
  name: z.string().min(3, 'Nome muito curto').optional(),
  email: z.email('Email inválido'),
  phone: z
    .string()
    .optional()
    .refine( (value) => {
      if (!value) return true;
      return isPhone(value);
    }, {
      message: 'Telefone inválido, envie no padrao 1139723768'
    }),
  consent: z.boolean().optional()
});