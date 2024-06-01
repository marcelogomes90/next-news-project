import { z } from 'zod';
import dayjs from 'dayjs';

export const NEWS_FILTER_FORM_SCHEMA = z.object({
  busca: z.string().optional(),
  de: z.string().transform((value) => value && dayjs(value).format('MM-DD-YYYY')).optional(),
  ate: z.string().transform((value) => value && dayjs(value).format('MM-DD-YYYY')).optional(),
  qtd: z.string().transform((value) => parseInt(value, 10)).optional(),
});

export type NewsFilterForm = z.infer<typeof NEWS_FILTER_FORM_SCHEMA>;
