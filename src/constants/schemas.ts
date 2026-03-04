import { z } from 'zod';

export const NEWS_FILTER_FORM_SCHEMA = z
  .object({
    busca: z.string().optional(),
    de: z.string().optional(),
    ate: z.string().optional(),
    qtd: z
      .union([z.number(), z.string()])
      .transform((value) => Number(value))
      .refine((value) => Number.isFinite(value) && value > 0 && value <= 50, {
        message: 'Informe um numero entre 1 e 50.',
      }),
  })
  .refine((values) => {
    if (!values.de || !values.ate) return true;
    return values.de <= values.ate;
  }, {
    path: ['ate'],
    message: 'A data final deve ser maior ou igual a data inicial.',
  });

export type NewsFilterForm = z.infer<typeof NEWS_FILTER_FORM_SCHEMA>;
